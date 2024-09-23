const moviesRouter = require('express').Router()
const Movie = require('../models/movie')

moviesRouter.get('/', async (_request, response) => {
    const movies = await Movie.find({})
    response.json(movies)
})

moviesRouter.get('/:id', async(_request, response) => {
    const movie = await Movie.findOne({ imdbID: request.params.id })
    if (movie) {
        response.json(movie)
    } else {
        response.status(404).end()
    }
})

moviesRouter.post('/', async (request, response) => {
    const body = request.body
    //const user = request.user

    const movie = new Movie({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    })
  
    const savedMovie = await movie.save()
    //user.movies = user.movies.concat(savedMovie.id)
    //await user.save()
  
    response.status(201).json(savedMovie)
})

moviesRouter.delete('/:id', async (request, response) => {
    //const user = request.user
    await Movie.findOneAndDelete({ imdbID: request.params.id })
    response.status(204).end()
  
    //console.log(user)
  
    //console.log(user.id.toString())
    //console.log(blog.user.id.toString())
  
    /*if(user.id.toString() == blog.user.id.toString()){
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }*/
    //response.status(400).end()
  
})

moviesRouter.put('/:id', async (request, response) => {
    const { poster } = request.body //recibe arreglo de peliculas favoritas (con imdbID)
    const updatedMovie = await Movie
        .findOneAndUpdate({ imdbID: request.params.id }, { poster })
    response.status(201).json(updatedMovie)
})

module.exports = moviesRouter