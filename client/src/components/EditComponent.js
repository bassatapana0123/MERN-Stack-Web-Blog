import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import {useLocation} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../service/authorize";
/* eslint-disable react-hooks/exhaustive-deps */


const EditComponent=()=>{
    const location = useLocation();
    const slug1 = location.state; //รับค่า Slug จาก LINK ที่ส่งมา
    const [stateblog,setState] = useState({
      title:"",
      author:"",
      slug:""
    })
    const {title,author,slug} = stateblog  //ดึงค่าจาก object (state)

    const [content,setContent] = useState('')

    const submitContent=(event)=>{
        setContent(event)
      };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug1}`)
         .then(response=>{
             const {title,content,author,slug} = response.data
             setState({...stateblog,title,content,author,slug})
             setContent(content)
             
         })
         .catch(err=>alert(err));
     },[])

    //กำหนดค่าให้กับ state
    const handleChange =name=>(event) => {
      setState({...stateblog,[name]:event.target.value});
    };


    const showUpdateFrom=()=>(
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
                style={{border:'1px solid #666'}}
                />           
            </div>
            <div className="form-group">
                <label>ผู้แต่ง</label>
                <input type="text" className="form-control" value={author} onChange={handleChange("author")}></input>
            </div>
            <br></br>
            <input type="submit" value="อัพเดต" className="btn btn-primary"></input>
          </form>
    )

    const submitForm=(e)=>{
      e.preventDefault();
      console.log("API URL",process.env.REACT_APP_API)
      axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author}
      ,{
        headers:{
          Authorization:`Bearer ${getToken()}`
        }
      })
          .then(response=>{
          //alert("บันทึกข้อมูลเรียบร้อย")
          Swal.fire('ดำเนินการเสร็จสิ้น','อัพเดตบอความเรียบร้อย','success')
            const {title,content,author,slug} = response.data
            setState({...stateblog,title,author,content,slug})

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
          <h1>แก้ไขบทความ</h1>
         {showUpdateFrom()}
        </div>
    );   
}

export default EditComponent;