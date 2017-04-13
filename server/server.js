import webpack from 'webpack'
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import Express from 'express'
import webpack_config from './../webpack.config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import routes from './routes/appRoutes'

const compiler = webpack(webpack_config),
  dbUrl = 'mongodb://localhost/messenger',
  app = new Express(),
  DIST_DIR = path.join(__dirname, "..", "client"),
  DEFAULT_PORT = 3000,
  HTML_FILE = path.join(DIST_DIR, "index.html"),
  DEVELOMPENT_MODE = process.env.NODE_ENV !== 'prod',
  PORT = process.env.PORT || DEFAULT_PORT

mongoose.connect(dbUrl, (err, res) => {
  if (err) {
    console.log('DB connection failed: ' + err)
  } else {
    console.log('DB connection succeed: ' + dbUrl)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', routes)

app.use(Express.static(path.join(__dirname, 'client')));

if (DEVELOMPENT_MODE) {
  console.log('develop')
  
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpack_config.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get("*", (req, res, next) => {
   res.sendFile(HTML_FILE);

  });
} else {
  
  app.get("*", (req, res, next) => {
    res.sendFile(HTML_FILE);
  });
}

let listener = app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Listening at localhost: ${PORT}`)
})