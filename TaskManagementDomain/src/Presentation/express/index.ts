import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT);

app.get('/', (req, res) => {
  res.end('hello world');
});

// taskGroup
app.get('/taskGroups', async (req, res) => {});
app.post('/taskGroups', async (req, res) => {});
app.delete('/taskGroups/:id', async (req, res) => {});

// task
app.get('/taskGroups/:taskGroupId/tasks', async (req, res) => {});
app.post('/taskGroups/:taskGroupId/tasks', async (req, res) => {});
app.delete('/taskGroups/:taskGroupId/tasks', async (req, res) => {});
