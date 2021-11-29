import request from "supertest";
import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();
        const password = await hash("1234", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', '12345')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "1234"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
	        description: "category supertest"
        }).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(201);
    });

    it("Should not to be able to create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "1234"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
	        description: "category supertest"
        }).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(400);
    });

});