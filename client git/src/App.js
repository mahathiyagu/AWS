import ImageUpload from "./components/imageUpload";
import Login from "./components/login";
import Register from "./components/register";
import ViewImages from "./components/viewImages";
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from "./components/homepage";
import Postlogin from "./components/postlogin";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/imageUpload' element={<ImageUpload/>}/>
    <Route path='/viewImages' element={<ViewImages/>}/>
    <Route path="/loggedin" element={<Postlogin/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
