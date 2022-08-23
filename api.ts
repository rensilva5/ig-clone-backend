import express from "express"
import cors from "cors"
import { photoRouter } from "./src/routers/photo-router" // my  own file

const app = express()
app.use(cors())   // alows everyone to access
app.use(express.json()) // utilizinng json

app.use('/photos', photoRouter)

const PORT = 5001
app.listen(PORT,()=> {
    console.log('we are listening port', PORT)
})
