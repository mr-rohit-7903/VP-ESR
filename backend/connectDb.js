import mongoose from 'mongoose'
import { DB_NAME } from './constant.js'
const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`connected to database ${conn.connection.port}`)
    } catch (error) {
        console.log(`error while connecting to database ${error.message}`);
    }
}

export default connectDb