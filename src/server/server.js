import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';

dotenv.config();

const ENV = process.env.ENV || 'dev';
const PORT = process.env.PORT || 3000;
const app = express();

if(ENV == 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler =  webpack(webpackConfig);
  const { publicPath } = webpackConfig.output.publicPath;
  const serverConfig = { publicPath, serverSideRender: true };

  app.use(webpackDevMiddleware(compiler,serverConfig));
  app.use(webpackHotMiddleware(compiler));
}



app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/assets/app.css" type="text/css">
  <title>Platzi Video</title>
</head>

<body>
  <div id="app"></div>
  <script src="/assets/app.js" type="text/javascript"></script>
</body>

</html>`)
})

app.listen(PORT, (err) => {
  if(err) console.log(err);
  else console.log(`Server running on port ${PORT}`)
})