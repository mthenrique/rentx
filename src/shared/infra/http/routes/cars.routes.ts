import { Router } from 'express';
import multer from 'multer';

import uploadConfig from "@config/upload";
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

const carsRoutes = Router();

const createCarControler = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig);

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarControler.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id",ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, uploadCarImages.array("images"), uploadCarImagesController.handle);

export { carsRoutes };