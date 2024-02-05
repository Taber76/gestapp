import express from 'express';
import cors from 'cors';

import { PORT } from './config/environment';
import MongoDB from './config/mogodb';
import userRouter from './routes/user.route';

const app = express();

// ---------- Database connection --
MongoDB.getInstance().getConnection();
if (!MongoDB.getInstance().getConnection()) {
  console.log('No connection to database');
}

// ---------- Middlewares ----------
app.use(express.json());
app.use(cors());

// ---------- Routes ---------------
app.use('/api/v1/user', userRouter);

// ---------- Websocket ------------

// ---------- Start server ---------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export default app