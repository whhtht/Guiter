import express, { Application } from 'express'

import httpContext from 'express-http-context'

import cors from 'cors'
import httpLogger from 'utils/httpLogger'
import errorHandling from 'middlewares/errorHandling.middleware'
import uniqueReqId from 'middlewares/uniqueReqId.middleware'
import http404 from 'routes/404/404.router'

import api from './api'

import { signUp, signIn } from './utils/awsCognito';

const app: Application = express()

const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // The methods you want to allow
  credentials: true, // This allows session cookies to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signUp(email, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signIn(email, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', api);
app.use(httpContext.middleware);
app.use(httpLogger.successHandler);
app.use(httpLogger.errorHandler);
app.use(uniqueReqId);
app.use(http404);
app.use(errorHandling);

export default app;
