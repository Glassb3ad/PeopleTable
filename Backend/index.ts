import express from 'express';
import cors from 'cors';
import personRouter from './src/routers/personRouter';
import { InitializePeople } from './src/services/personService';

const PORT = 3001;
InitializePeople()

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/people',personRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});