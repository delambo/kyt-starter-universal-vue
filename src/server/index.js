process.env.VUE_ENV = 'server';
import 'source-map-support/register'; // eslint-disable-line import/imports-first

const fs = require('fs');
const path = require('path');
const express = require('express');
const serialize = require('serialize-javascript');
let template = require('./template').default;
// eslint-disable-next-line import/no-dynamic-require
const clientAssets = require(KYT.ASSETS_MANIFEST);

// https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

const app = express();

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

// We need to split the template html into two parts -
// head: the html up until the <body> tag
// tail: the rest
const html = (() => {
  template = template({
    jsBundle: clientAssets.main.js,
    cssBundle: clientAssets.main.css,
  });
  const headIndex = template.indexOf('<body>') + 6;
  return {
    head: template.slice(0, headIndex),
    tail: template.slice(headIndex + 1),
  };
})();

const bundlePath = path.join(process.cwd(), 'build/server/server.js');
// Add a cache to the second argument:
// https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#cache
const renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'));

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.');
  }

  const s = Date.now();
  const context = { url: req.url };
  const renderStream = renderer.renderToStream(context);
  let firstChunk = true;

  res.write(html.head);

  renderStream.on('data', (chunk) => {
    // Embed the initial store state.
    if (firstChunk) {
      if (context.initialState) {
        res.write(
          `<script>window.__INITIAL_STATE__=${
            serialize(context.initialState, { isJSON: true })
          }</script>`
        );
      }
      firstChunk = false;
    }
    res.write(chunk);
  });

  renderStream.on('end', () => {
    res.end(html.tail);
    console.log(`whole request: ${Date.now() - s}ms`); // eslint-disable-line no-console
  });

  renderStream.on('error', (err) => {
    throw err;
  });

  return undefined;
});

app.listen(parseInt(KYT.SERVER_PORT, 10));
