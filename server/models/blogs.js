const mongooes = require("mongoose")

const blogScema = mongooes.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:{},
        require:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{    //จัดรูปแบบ url        
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true}) //timestamp

module.exports = mongooes.model("Blog",blogScema)