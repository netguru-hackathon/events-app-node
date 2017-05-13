import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import apiRouter from './api/router';

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true,
}));

apiRouter(app);

export default app;
