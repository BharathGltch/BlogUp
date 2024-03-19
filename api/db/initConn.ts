import pgPromise from "pg-promise";
const pgp = pgPromise();
const db = pgp("postgres://postgres:1234@localhost:5432/postgres");
export { pgp, db };
