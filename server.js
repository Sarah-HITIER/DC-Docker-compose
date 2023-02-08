const express = require("express");
const app = express();
const port = 3000;

const { Client } = require("pg");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/insertData", async (req, res) => {
    const client = new Client({
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
        user: process.env.APP_USER,
        database: process.env.APP_DATABASE,
        password: process.env.APP_PASSWORD
    });
    await client.connect();
    client.query(
        "CREATE TABLE IF NOT EXISTS posts (title VARCHAR(255), content VARCHAR(255))"
    );
    client.query(
        "INSERT INTO posts (title, content) VALUES ('Titre', 'Lorem Ipsum')",
        (error, results) => {
            if (error) {
                throw error;
            }
            res.send(`Post added.`);
            client.end();
        }
    );
});

app.get("/getData", (req, res) => {
    const client = new Client({
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
        user: process.env.APP_USER,
        database: process.env.APP_DATABASE,
        password: process.env.APP_PASSWORD
    });
    client.connect();
    client.query("SELECT * FROM posts", (error, results) => {
        if (error) {
            throw error;
        }
        res.json(results.rows);
        client.end();
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
