import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import "dotenv/config";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import riderRouter from "./routes/RiderRoute.js";


//app config
const app = express()
const PORT = 4000;


//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB()

//API endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))  //exposing the 'uploads' folder on this API
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/rider", riderRouter)

app.get("/", (req, res)=>{
  res.send("API is Working!!")
})

app.listen(PORT, ()=>{
  console.log(`Server is running on PORT: ${PORT}`)
})

//mongodb+srv://shivanshmangla72:Hello123@cluster0.qysnc.mongodb.net/?