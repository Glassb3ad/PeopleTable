import express from 'express';
import cors from 'cors';
import personRouter from './src/routers/personRouter';
const app = express();
app.use(express.json());

const PORT = 3001;
app.use(cors());
app.use('/api/people',personRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});