import { configDotenv } from "dotenv";
import app from './app.js'
import connectDb from "./connectDb.js";

configDotenv()
connectDb();

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Listening on PORT ${port}`)
})

