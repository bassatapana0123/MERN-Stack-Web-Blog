import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DOMPurify from 'dompurify';//ปฏิเสธการรันโค้ด JavaScript โดยใช้ DOMPurify
import { getUser,getToken } from "./service/authorize";



function App() {
  const [blogs,setBlogs] = useState([]);

  const fecthData =()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data);
    })
    .catch(err=>alert(err));
  }

  useEffect(()=>{
    fecthData()
  }, [])// ระบุตัวแปรที่ถูกเช็คว่ามีการเปลี่ยนแปลงในนี้ (ในกรณีนี้คือ blogs)


  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบบทความหรือไม่ ?",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{
      //กดปุ่ม ok
        if(result.isConfirmed){
          deleteBlog(slug)
          
        }
    })
  }
  const deleteBlog=(slug)=>{
    //ส่ง reqest ไปที่ api เพื่อลบข้มูล
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`
    ,{headers:{
      Authorization:`Bearer ${getToken()}`
    }})
    .then(response=>{
          Swal.fire("Deleted!",response.data.message,"success")
          fecthData()
    })
    .catch(err=>console.log(err))
  }


  return (
    <div className="container p-5">
      <NavbarComponent/>
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`} state={blog.slug}>
            <h2>{blog.title}</h2>
            </Link>
            {/*render HTML blog.conyent*/}
            <div className="pt-3"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content.substring(0, 180))}} 
            /> 
            <p className="text-muted">{blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            {getUser() &&(
                <div><Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`} state={blog.slug}>Edit</Link> &nbsp;
                <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>Delete</button>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
