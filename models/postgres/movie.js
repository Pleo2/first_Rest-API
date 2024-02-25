import pg from './pg.js'

export class MovieModel {
    static async getAll({ genre }) {
        try {
            await pg.query('SELECT * FROM movie;')

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
