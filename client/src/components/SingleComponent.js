import {useLocation} from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import DOMPurify from 'dompurify';//ปฏิเสธการรันโค้ด JavaScript โดยใช้ DOMPurify

const SingleComponent=()=>{
    const location = useLocation();
    const slug = location.state;
    //let { state } = useLocation();
    const [blog,setBlog] = useState('');

    useEffect(()=>{
       axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            setBlog(response.data);
        })
        .catch(err=>alert(err));
    },[slug])

    return(
        <div className="container p-5">
           <NavbarComponent/>
           {/* ตรวจสอบว่า state blog ได้รับค่า setBlog(response.data) หรือยังก่อนทำการ render HTML */}
           {blog && 
            <div>
                <h1>{blog.title}</h1>
            <div className="pt-3"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content)}} 
                /> 
            <p className="text-muted">{blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            </div>}
        </div>
    )
}

export default SingleComponent; 