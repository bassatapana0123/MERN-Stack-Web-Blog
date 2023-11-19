import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from "./App";
import FormComponent from "./components/FormComponent";
import SingleComponent from './components/SingleComponent';
import EditComponent from './components/EditComponent';
import LoginComponent from './components/LoginComponent';
import AdminRoute from './adminRoute';


const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Routes>
                {/* public route */}
                <Route path="/" exact element={<App />} />               
                <Route path='/blog/:slug' exact element={<SingleComponent />} />  
                <Route path='/login' exact element={<LoginComponent />} />

                {/* we want to protect these route */}
                <Route element={<AdminRoute/>}>

                <Route path="/create" exact element={<FormComponent />} /> 
                <Route path='/blog/edit/:slug' exact element={<EditComponent />} />
                
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoute;
