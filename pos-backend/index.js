import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import connectDb from "./config/connectDB.js";
import ItemsModel from "./models/itemModel.js";
import mountRoutes from "./routes/mountRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
dotenv.config({path : "./config.env"});

const app = express();

connectDb();
app.use(express.json());
app.use(cookieParser());

// credential
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
    // origin: "https://zef-marketplace.web.app",
    // origin: 'http://localhost:3000'
    // origin: 'https://zef-proshop.web.app'
  })
);



app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Use 'secure: true' for HTTPS
}));

// Set a session
app.get('/set-session', (req, res) => {
  req.session.sessionName = 'sessionValue';
  res.send('Session has been set');
});

// Get a session
app.get('/get-session', (req, res) => {
  const sessionValue = req.session.sessionName;
  res.send('Session value: ' + sessionValue);
});





// app.use(cors({ origin: 'https://zef-proshop.web.app' }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',  process.env.FRONT_URL);
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Origin', 'https://zef-marketplace.web.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  


// credential


const port = process.env.PORT || 5000



app.get("/" , (req, res) => {
  res.json("Zef-P-o-S api is running")
})


mountRoutes(app);

app.use(notFound);
app.use(errorHandler);


app.listen(port , () => {
  console.log(`app is running on port ${port}`);
})