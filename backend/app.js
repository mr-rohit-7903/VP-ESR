import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import bookingRoutes from './routes/booking.routes.js'

dotenv.config();
const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{ //checking if working fine 
    res.send('Hello')
})

//for the sending to the booking route 
app.use('/api/bookings', bookingRoutes);

export default app