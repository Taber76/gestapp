import express from 'express';
import cors from 'cors';

const PORT = 3000
const app = express();

// ---------- Middlewares ----------
app.use(express.json());
app.use(cors());

// ---------- Routes ---------------


// ---------- Websocket ------------

// ---------- Start server ---------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export default app