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

    it("Should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "1234"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories").send({
            name: "Category Supertest1",
	        description: "category supertest1"
        }).set({
            Authorization: `Bearer ${token}`,
        });

        const response = await request(app).get("/categories");

        console.log(response.body)

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

}); 