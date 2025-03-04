import express from 'express';
import dotenv from 'dotenv';
import { user_route } from './routes/user.route';
import './config/database';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));
app.use("/api/users", user_route);

app.listen(port, () => console.log(`Server is running on port ${port}`));
