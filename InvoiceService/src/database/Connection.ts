import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const settings = {
  host: process.env["DATABASE_HOST"],
  database: process.env["DATABASE_NAME"],
  user: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
  port:parseInt(process.env["DATABASE_PORT"] || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
};

const poolConnections = mysql.createPool(settings);

export default async function query(query: string, params: any[]) {
  try {
    const current_connection = await poolConnections.getConnection();
    console.log("Conexión a la base de datos exitosa.");
    const result = await current_connection.execute(query, params);
    current_connection.release();
    return result;
  } catch (error) {
    console.error("Ha ocurrido un error con tu peticion:" + error);
    return null;
  }
}
