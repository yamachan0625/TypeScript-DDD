import * as express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT);

app.get('/', (req, res) => {
  res.end('hello world');
});

app.get('/users', async (req, res) => {
  const users = await prisma.task.findMany();
  res.json({ users });
});
