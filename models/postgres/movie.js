import { pg } from './pg.js'

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()
            const { rows } = await pg.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = $1',
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
        [id]
    )
        if (movie.length === 0) return null
        return movie[0]
    }

    static async create({ input }) {
        
    }

    static async delete({ id }) {
        const { rows: movie } = await pg.query(
            'DELETE FROM movie WHERE id = $1;',
            [id]
        )
            if (movie.length === 0) return null
            return movie[0]
    }

    static async update({ id, input }) {}
}
