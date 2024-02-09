import { Router } from 'express'

import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

// movies routes
moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)

// /:id routes
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)
