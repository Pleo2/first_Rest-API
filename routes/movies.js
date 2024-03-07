import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
    // movies routes
    const moviesRouter = Router()
    const movieController = new MovieController({ movieModel })

    moviesRouter.get('/', movieController.getAll)
    moviesRouter.post('/', movieController.create)

    // /:id routes
    moviesRouter.get('/:id', movieController.getById)
    moviesRouter.delete('/:id', movieController.delete)
    moviesRouter.patch('/:id', movieController.update)

    return moviesRouter
}
