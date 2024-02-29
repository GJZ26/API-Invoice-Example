import express from 'express'
import { getController, makeController } from './dependencies';

const paymentsRouter=express.Router()

paymentsRouter.get('/', getController.run.bind(getController));
paymentsRouter.post('/', makeController.run.bind(makeController));

export default paymentsRouter;