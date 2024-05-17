import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoute from './routes/todos.js';
import sequelize from './config/database.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use('/todos', todoRoute);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const PORT = 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
