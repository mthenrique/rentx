import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";

//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

//ICategoriesRepository
container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);