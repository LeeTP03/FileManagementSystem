import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://admin:admin@cluster0.rjll4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;