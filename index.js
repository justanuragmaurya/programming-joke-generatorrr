import express, { response } from "express";
import axios from "axios";
import morgan from "morgan";
const port = 3000;
const app = express();
let jokee;

app.listen(port,()=>{
    console.log("Listening at port "+port);
});

app.set('view engine', 'ejs');
app.use(morgan("tiny"));
app.get('/',(req,res)=>{
    res.render("index.ejs",{
        data: jokee
    });
    jokee = "";
});

app.post("/getjoke",async (req,res)=>{
    try{
        const response = await axios.get("https://v2.jokeapi.dev/joke/Programming")
        if(response.data.type == "twopart"){
            jokee = response.data.setup +"\n"+ response.data.delivery;
        }
        else{
            jokee = response.data.joke || "No joke found.";
        }
        console.log(response.data);
    }catch(error){
        console.log("Error",error.message);
        jokee = "Error fetching joke."
    }
    res.redirect("/");
});