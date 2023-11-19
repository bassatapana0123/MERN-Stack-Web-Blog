const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongooes = require("mongoose")
require("dotenv").config()
const blogRoute = require('./routes/blog')
const authRoute  = require('./routes/auth')
const app = express()

//connet cloud database
mongooes.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("Connect Server Succeedfull"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api',blogRoute)
app.use('/api',authRoute)

const port = process.env.PORT
app.listen(port,()=>console.log(`Start server in port ${port}`))