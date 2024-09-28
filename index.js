import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({path:"./.env"})

const app = express();
const port = 3000;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = process.env.APIKEY

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/",async(req,res)=>{
    try{
        const city = req.body.city;
        const response = await axios.get(`${apiUrl}?q=${city}&appid=${apiKey}`)
        const result = response.data;
        console.log(result)
        const imgUrl = `https://openweathermap.org/img/w/${result.weather[0].icon}.png`
        res.render("index.ejs",{data:result, img:imgUrl});
    }catch(error){
        console.log("Failed to fetch data",error);
        res.render("index.ejs",{error:error})
    }
})

app.listen(port,()=>{
    console.log("Server is running at port ",port);
})