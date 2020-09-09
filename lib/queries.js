const Pool = require('pg').Pool;
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
};

const proConfig = {
    connectionString: process.env.DATABASE_URL
}
const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig
);

const getGames = async () => {
    const client = await pool.connect()
    try {
        let dbRes = await client.query(`
            SELECT * FROM games ORDER BY id ASC
        `);
        client.release();
        return dbRes.rows;
    } catch (e) {
        client.release();
        console.error(e);
        console.trace();
        return null;
    }
}

const getGameById = async (req) => {
    const client = await pool.connect()
    try {
        let dbRes = await client.query(`
            SELECT * FROM games WHERE id = $1
        `,[req.params.id]);
        client.release();
        return dbRes.rows;
    } catch (e) {
        client.release();
        console.error(e);
        console.trace();
        return null;
    }
}

const createGame = async (req) => {
    const client = await pool.connect()
    try {
        let dbRes = await client.query(`
            INSERT INTO games (title, company) VALUES ($1, $2) returning *
        `,[req.body.title,req.body.company]);
        client.release();
        return dbRes.rows[0];
    } catch (e) {
        client.release();
        console.error(e);
        console.trace();
        return null;
    }
}

const updateGame = async (req) => {
    const client = await pool.connect()
    try {
        let dbRes = await client.query(`
            UPDATE games SET title = $1, company = $2 WHERE id = $3 returning *
        `,[req.body.title,req.body.company, req.params.id]);
        client.release();
        return dbRes.rows[0];
    } catch (e) {
        client.release();
        console.error(e);
        console.trace();
        return null;
    }
}

const deleteGame = async (req) => {
    const client = await pool.connect()
    try {
        let dbRes = await client.query(`
            DELETE FROM games WHERE id = $1
        `,[req.params.id]);
        let id = dbRes.rows[0]
        client.release();
        return id;
    } catch (e) {
        client.release();
        console.error(e);
        console.trace();
        return null;
    }
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
}