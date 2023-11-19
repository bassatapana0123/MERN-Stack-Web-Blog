import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser, getToken } from "../service/authorize";

const FormComponent=()=>{
    const [state,setState] = useState({
      title:"",
      author:getUser()
    })
    const {title,author} = state

    const [content,setContent] = useState('')

    //กำหนดค่าให้กับ state
    // const inputValue=name=>event=>{
    //   console.log(name,"=",event.target.value)
    // }
    const handleChange=name=>(event) => {
      setState({...state,[name]:event.target.value});
    };
    const submitContent=(event)=>{
      setContent(event)
    };

    const submitForm=(e)=>{
      e.preventDefault();
      console.log("API URL",process.env.REACT_APP_API)
      axios
      .post(`${process.env.REACT_APP_API}/create`,{title,content,author},
      {
        headers:{
          Authorization:`Bearer ${getToken()}`
        }
      })
      .then(response=>{
          //alert("บันทึกข้อมูลเรียบร้อย")
          Swal.fire(
            'ดำเนินการเสร็จสิ้น',
            'บันทึกข้อมูลสำเร็จ',
            'success'
          )
          setState({...state,title:"",author:""})
          setContent("")
    }).catch(err=>{
          //alert(err.response.data.error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.error}`,
          })
    })
    }
    return (
        <div className="container p-5">
          <NavbarComponent/>
          <h1>เขียนบทความ</h1>
          <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" value={title} onChange={handleChange("title")}>
                </input>
            </div>
            <div className="form-group">
                <label>รายละเอียด</label>
                <ReactQuill
                value={content}
                onChange={submitContent}
                theme="snow"
                className="pb-5 mb-3" 
                placeholder="เขียนรายละเอียดบทความของคุณ"
                style={{border:'1px solid #666'}}
                />                   

            </div>
            <div className="form-group">
                <label>ผู้แต่ง</label>
                <input type="text" className="form-control" value={author} onChange={handleChange("author")}></input>
            </div>
            <br></br>
            <input type="submit" value="บันทึก" className="btn btn-primary"></input>
          </form>
        </div>
    );   
}

export default FormComponent;