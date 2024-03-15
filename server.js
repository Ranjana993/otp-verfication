const express = require("express")
require("dotenv").config()
const cors = require("cors");
const router = require("./routes/user_route");
const bodyParser = require("body-parser");
const { connectDB } = require("./database/database");


const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
app.use("/api" , router)
connectDB()

app.get("/" , (req , res) =>{
  res.send("<h1>Hello from backend side...</h1>")
})
app.get("/test", (req, res) => {
  res.send("<h1>Hello from backend side...</h1>")
})

app.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}`))