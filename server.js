const express =require('express')
const dotenv=require("dotenv")

dotenv.config({path:'config.env'})
const app = express()

app.get('/',(req,res)=>{
    res.send('hello world')
})
const PORT=process.env.PORT||8000
app.listen(8000,()=>{
    console.log(`server is running on port ${PORT}`)
})