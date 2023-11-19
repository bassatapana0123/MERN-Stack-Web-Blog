import NavbarComponent from "./NavbarComponent";
import { useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../service/authorize";
import { useNavigate } from 'react-router-dom';
/* eslint-disable react-hooks/exhaustive-deps */
// import { withRouter } from 'react-router-dom';


const LoginComponent=(props)=>{
    const [state,setState] = useState({
        username:"",
        password:""
      })
    const {username,password} = state
    const navigate = useNavigate();

    //กำหนดค่าให้ state เมื่อเกิด event
    const handleChange=name=>(event) => {
        setState({...state,[name]:event.target.value});
      }

    const submitForm=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
          // Login สำเร็จ
          // console.log(response.data)
          authenticate(response, () => {
            navigate("/create"); // ใช้ navigate ที่ถูกส่งเข้ามา
          });
          
          // authenticate(response,()=>props.history.push("/create"))
        }).catch(err=>{
           //alert(err.response.data.error)
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.error}`,
          })
        })
    }

    useEffect(()=>{
      getUser() && navigate("/")
    },[])
    
    return(
        <div className="container p-5">
          <NavbarComponent/>
          <h1>เข้าสู่ระบบ | Admin</h1>
          {/* {JSON.stringify(state)} */}
          <form onSubmit={submitForm}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={handleChange("username")}>
                </input>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={handleChange("password")}></input>
            </div>
            <br></br>
            <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"></input>
          </form>
        </div>
    )
}

export default LoginComponent;

// export default withRouter(LoginComponent)

