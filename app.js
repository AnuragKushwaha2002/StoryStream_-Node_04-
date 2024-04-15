require("dotenv").config();

const express =require("express");
const path =require("path")
const mongoose =require("mongoose");
const cookieParser =require('cookie-parser');
const app =express();

const Blog =require('./models/blog')
const PORT =process.env.PORT || 8000;

const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');


const { checkforAuthenticationCookie } = require("./middlewares/auth");
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkforAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))
// app.use(express.static(path.join(__dirname,'public')))



// mongoose.connect('mongodb://127.0.0.1:27017/storystream')
// .then((e)=>console.log("mongoDB Connected"))

mongoose.connect(process.env.MONGO_URL)
.then((e)=>console.log("mongoDB Connected"))


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",async (req,res) =>{
    const allBlogs =await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
})
app.use('/user',userRoute);
app.use('/blog',blogRoute);


app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`))
