import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Carro 1",
            description: "Descrição do carro",
            daily_rate: 100.00,
            license_plate: "DEF-1313",
            fine_amount: 50,
            brand: "Marca do carro",
            category_id: "Id Categoria"
        });

        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro 2",
            description: "Descrição do carro",
            daily_rate: 100.00,
            license_plate: "DEF-1313",
            fine_amount: 50,
            brand: "Car_brand_test",
            category_id: "Id Categoria"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        });
 
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro 3",
            description: "Descrição do carro",
            daily_rate: 100.00,
            license_plate: "DEF-1313",
            fine_amount: 50,
            brand: "Car_brand_test",
            category_id: "Id Categoria"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Carro 3"
        });
 
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro 4",
            description: "Descrição do carro",
            daily_rate: 100.00,
            license_plate: "DEF-1313",
            fine_amount: 50,
            brand: "Car_brand_test",
            category_id: "Category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "Category_id"
        });
 
        expect(cars).toEqual([car]);
    });
})