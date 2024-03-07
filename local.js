import { createApp } from "./app.js";
import { MovieModel } from "./models/local-files-system/movie.js";

createApp({movieModel: MovieModel})