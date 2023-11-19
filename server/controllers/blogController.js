//ติดต่อกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');
//บันทึกข้อมูล
exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    //บันทึกข้อมูล Mongoose ไม่รองรับ callback funtion ให้ไปใช้ Promise แทน
    // Blogs.create({title,content,author,slug},(err,blog)=>{
    //     if(err){
    //         res.status(400).json({error:err})
    //     }
    //     res.json(blog)
    // })

    Blogs.create({title,content,author,slug})
        .then(blog => {
        res.json(blog);
    })
        .catch(err => {
         console.error(err);
        res.status(400).json({error:"ชื่อบทความซ้ำกัน"});
    });

}
//ดึงข้อมูลบทความทั้งหมด
//mongoose ไม่รองรับ callback function
// exports.getAllblogs=(req,res)=>{
//     Blogs.find({}).exec((err,blogs)=>{
//         res.json(blogs)
//     })
//  }

exports.getAllblogs = (req, res) => {
    Blogs.find({}).exec()
      .then(blogs => res.json(blogs))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
};

//ดึงบทความที่สนใจอ้างอิงจาก slug
exports.singleBlog = (req, res) => {
    const {slug} = req.params
    Blogs.findOne({slug}).exec()
    .then(blog => {
        if (blog) {
          res.json(blog);
        } else {
          res.status(404).json({message: 'Data not found'});
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    });
};

exports.remove = (req, res) => {
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec()
    .then(blog => {
        if (blog) {
          res.json({message:"ลบบทความเรียบร้อย"});
        } else {
          res.status(404).json({message: 'Data not found'});
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    });
};
  
exports.update = (req,res)=>{
    const {slug} = req.params
    // ส่งข้อมูล => title, content,author
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec()
        .then(blog =>{
            res.json(blog);
        })
        .catch(err=>{
            console.error(err);
        })

};

  
  