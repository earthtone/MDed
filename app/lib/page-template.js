var default_meta = {
  lang: 'en',
  title: 'A Page',
  stylesheets: ['css/style.css'],
  scripts: ['js/main.js'],
  charset: 'utf-8',
  description: 'This is a page',
  keywords: 'page, sample',
  author: 'None',
  favicon: 'img/favicon.png',
  viewport: 'width=device-width, initial-scale=1',
  extra: []
};

module.exports = function generatePage(state){
  var { content } = state;
  var meta = Object.assign(default_meta, state.meta);

  return `<!DOCTYPE html>
<html lang="${meta.lang}">
  <head>
    <title>${meta.title}</title>
    <meta charset="${meta.charset}">
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <meta name="author" content="${meta.author}">
    ${
      meta.hasOwnProperty('extra')
        ?meta.extra.length
          ? meta.extra.map(value => `<meta ${value}>`)
          : ''
        :''
    }
    <meta name="description" content="${meta.description}">
    ${
      meta.hasOwnProperty('stylesheets')
        ?meta.stylesheets.length
          ?meta.stylesheets.map(value => `<link rel="stylesheet" href="${value}">`).join('\n')
          : ''
        : 'template.js'
    }
    ${
      meta.hasOwnProperty('scripts')
        ?meta.scripts.length
          ?meta.scripts.map(value => `<script src="${value}"></script>`).join('\n')
          : ''
        : ''
    }
    <link rel="icon" type="image/png" href="${meta.favicon}">
    <style>
      body {
        padding: 1em;
      }
    </style>
  </head>
  <body>
    ${content}
  </body>
</html>
`;
};