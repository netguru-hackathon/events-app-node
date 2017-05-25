import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
import apiRouter from './api/router';
import SessionsController from './api/controllers/sessions';

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => res.send('Hello in sample events app api !!!'));

app.get('/slack/auth', SessionsController.create);

app.get('/login', (req, res) => {
  res.sendFile(path.resolve('./app/log_button.html'));
});

app.use('/api', apiRouter);

export default app;
