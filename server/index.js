import  express  from "express";
import cors from 'cors'
import { connection } from "./database/db.js";
//import { DefaultData } from "./default.js";
import router from "./routes/route.js";


const app=express();


app.use(cors())

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended: true}))

connection();
//DefaultData();

app.use('/', router);

app.listen(3001, ()=>console.log("backend Connected"))

