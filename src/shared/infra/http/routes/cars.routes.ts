import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

let createCarControler = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarControler.handle);

export { carsRoutes };