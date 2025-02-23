import { createConnection } from "typeorm";
import { User } from "../entities/user.entity";

export const db = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "project",
    entities: [User],
    synchronize: true,
});
