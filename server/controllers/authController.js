const jwt = require("jsonwebtoken");
// const expressJWT = require("express-jwt")
const { expressjwt: expressJwt } = require('express-jwt');

exports.login=(req,res)=>{
    //ข้อมูล username , password
    const {username,password}=req.body
    if(password === process.env.PASSWORD){
        //login เข้าสู่ระบบ
       const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
       return res.json({token,username})
    }else{
        return res.status(400).json({
            error:"รหัสไม่ถูกต้อง!"
        })
    }
}

//ตรวจสอบ token
exports.requireLogin=expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})