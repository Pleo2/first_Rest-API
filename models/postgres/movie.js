import { pg } from './pg.js'

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()
            const { rows } = await pg.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = $1;',
                [lowerCaseGenre],
            )
            if (rows[0].id) {
                const { rows: filterMovies } = await pg.query(
                    'SELECT id, year, duraction, poster, title, director, rate  FROM movie INNER JOIN movie_genres ON movie_id = movie.id WHERE genre_id = $1;',
                    [rows[0].id],
                )
                console.log(filterMovies)
                return filterMovies
            } else {
                return 'This id does not exist '
            }
        } else {
            const { rows: movies } = await pg.query(
                'SELECT id, year, duraction,poster,title,director,rate FROM movie;',
            )
            return movies
        }
    }

    static async getByid({ id }) {
        const { rows: movie } = await pg.query(
            'SELECT title, year, director, duraction, poster, rate, id FROM movie WHERE id = $1;',
            [id],
        )
        if (movie.length === 0) return null
        return movie[0]
    }

    static async create({ input }) {
        // create a filter que inpida crear una pelicula varias veces con el mismo nombre 
        const {
            genre: genreInput, // genre is an array
            title,
            year,
            duration,
            director,
            rate,
            poster,
        } = input

        // todo: crear la conexión de genre

        // crypto.randomUUID()
        const {rows: result} = await pg.query('SELECT gen_random_uuid() uuid;')
        const uuid = result[0].uuid
        console.log(uuid)
        try {
            await pg.query(
                'INSERT INTO movie (id, title, year, director, duraction, poster, rate) VALUES ($1, $2, $3, $4, $5, $6, $7);',
                [uuid, title, year, director, duration, poster, rate],
            )

            if (genreInput.length > 0) {
                genreInput.forEach(async element => {
                    const {rows: result} = await pg.query('SELECT id FROM genre WHERE name = $1', [element])
                    const idGenre = result[0].id
                    console.log(typeof(idGenre))

                    if (typeof(idGenre) === 'number') {
                        await pg.query('INSERT INTO movie_genres (movie_id, genre_id) Values ($1,$2)', [uuid, idGenre])
                    }
                });
            }
        } catch (e) {
            // throw new Error('Error creating movie')
            console.log(e)
            // enviar la traza a un servicio interno
            // sendLog(e)
        }

        const { rows: movie } = await pg.query(
            'SELECT title, year, director, duraction, poster, rate, id FROM movie WHERE id = $1;',
            [uuid],
        )
        if (movie.length === 0) return null
        return movie[0]
    }

    static async delete({ id }) {
        const { rows: movie } = await pg.query(
            'DELETE FROM movie WHERE id = $1;',
            [id],
        )
        if (movie.length === 0) return null
        return movie[0]
    }

    static async update({ id, input }) {
        // falta crear el update
    }
}
