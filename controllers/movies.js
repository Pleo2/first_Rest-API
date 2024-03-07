import { validateMovie, validatePartialMovie} from '../schemes/movies.js'

export class MovieController {
    constructor({movieModel}) {
       this.movieModel = movieModel 
    }
    
     getAll = async (req, res) =>  {
        const { genre } = req.query
        const movies = await this.movieModel.getAll({ genre })
        res.json(movies)
    }

     create = async (req, res) => {
        const result = validateMovie(req.body)

        if (!result.success) {
            // 422 Unprocessable Entity
            return res
                .status(400)
                .json({ error: JSON.parse(result.error.message) })
        }

        // en base de  datos
        const newMovie = await this.movieModel.create({ input: result.data })

        res.status(201).json(newMovie)
    }

     getById = async (req, res) => {
        const { id } = req.params
        const movie = await this.movieModel.getByid({ id })
        if (movie) res.json(movie) 
        else {
        res.status(404).json({ message: 'Movie not found' })
        }
    }

     delete = async (req, res) => {
        const { id } = req.params
        const result = await this.movieModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        return res.json({ message: 'Movie deleted' })
    }

     update = async (req, res) => {
        const result = validatePartialMovie(req.body)

        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updatedMovie = await this.movieModel.update({ id, input: result.data })

        return res.json(updatedMovie)
    }
}
