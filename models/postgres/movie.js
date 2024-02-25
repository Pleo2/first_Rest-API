import "dotenv/config"
import pkg from 'pg'
const { Pool } = pkg;

const pg = new Pool()

export class MovieModel {
    static async getAll({ genre }) {
        try {
            await pg.query('SELECT * FROM movie;')
            console.log('database conected')
        } catch (error) {
            console.log(error)
        }
    }

    static async getByid({ id }) {
    }

    static async create({ input }) {

    }

    static async delete({ id }) {
   }

    static async update({ id, input }) {

    }
}
