const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.memoryStorage();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const registerRoute = require('./register');
const loginRoute = require('./login');

app.use('/', registerRoute);
app.use('/', loginRoute);


mongoose
  .connect('mongodb+srv://tmahanirai:maha@cluster0.ndxurb4.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  
 imageSchema = new mongoose.Schema({
  filename: String,
  url: String,
  category: String,
});
const Image = mongoose.model('Image', imageSchema);

AWS.config.update({
    accessKeyId: 'AKIAV52OWJCDSSJTZSNV',
    secretAccessKey: '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',
    region: 'us-east-1'
});

const s3 = new AWS.S3();

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      return cb(new Error('Please upload a JPG or PNG file!'));
    }
    cb(undefined, true);
  },
});

app.get('/images/all', (req, res) => {
  const bucketName = 'maha-app-bucket';
  const prefix = 'images/';

  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      const images = data.Contents.map((obj) => {
        return `https://${bucketName}.s3.amazonaws.com/${obj.Key}`;
      });

      res.json(images);
    }
  });
});

app.post('/upload/image', upload.single('image'), (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).send('No image file found');
    return;
  }

  const uploadParams = {
    Bucket: 'maha-app-bucket',
    Key: `images/${file.originalname}`, // Specify the folder path
    Body: file.buffer,
  };

  //s3 to upload images
  s3.upload(uploadParams)
    .promise()
    .then((data) => {
      const imageUrl = data.Location;

      const image = new Image({
        filename: file.originalname,
        url: imageUrl,
        //category: req.body.category,
        category:"Employees",
      });

      return image.save();
    })
    .then((savedImage) => {
      res.json({ imageUrl: savedImage.url });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});


app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
