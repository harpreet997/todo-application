import { Route, Routes } from "react-router-dom";
import AddBlog from "./AddBlog";
import Home from "./Home";

const Router = () => {
    return ( 
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<AddBlog/>}/>
        </Routes>
     );
}
 
export default Router;