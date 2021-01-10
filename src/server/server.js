import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import Helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import initialState from '../frontend/initialState';
import helmet from 'helmet';


dotenv.config();

const ENV = process.env.ENV || 'dev';
const PORT = process.env.PORT || 3000;
const app = express();

if (ENV == 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output.publicPath;
  const serverConfig = { publicPath, serverSideRender: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: "none",
    })
  );
  app.disable('x-powered-by');

}

const setResponse = (html, preloadedState) => {
  return (`
  <!DOCTYPE html>
  <html lang="es">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/app.css" type="text/css">
    <title>Platzi Video</title>
  </head>

  <body>
    <div id="app">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="/assets/app.js" type="text/javascript"></script>
  </body>

  </html>
  `);
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>
  );
  res.set("Content-Security-Policy", "default-src 'self'; img-src 'self' http://dummyimage.com; script-src 'self' 'sha256-FHDpKcvGUi1iSAdix/k2dbFk10fS3phxZxT9ITIkWLM='; style-src-elem 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com");
  res.send(setResponse(html, preloadedState));
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${PORT}`)
})