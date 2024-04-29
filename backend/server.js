import express from 'express'
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();

// const mode = process.env.NODE_ENV

// const corsOptions = mode === 'development' ? {
//   origin: '*'
// } : {
//   origin: "https://mern-full-crud-2-i1mc.vercel.app/", // Replace with your frontend's URL
//   // methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
//   // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // Allowed headers
//   // credentials: true // Optional: Allow cookies or authorization credentials (if applicable)
// };

// const corsMiddleware = cors(corsOptions);

// app.use(corsMiddleware);
// app.use(cors());

app.use(express.json()); // middleware that intercepts requests but must be json

app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)

//"mongodb://localhost:27017"

mongoose.connect(process.env.DB_URI, { dbName: "demo_db" }).then(()=>{
  console.log("Connected to DB successfully")
})
.catch((error) => {console.log("error", error)})

app.listen(4000, () => console.log("Listening to port 4000"))
