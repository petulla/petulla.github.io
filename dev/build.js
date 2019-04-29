const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata');
const ncp = require('ncp');

const config = {};
config.src = './src';
config.build = './build';
config.ignore = './src/__helpers/**';

const outputpath = {};
outputpath.source = config.build + '/index.html';
outputpath.destination = '../index.html';

const logger = err => console.log(err);

metalsmith(__dirname)
  .source(config.src)
  .ignore([config.ignore])
  .destination(config.build)
  .use(metadata({
    meta: 'data/meta.yaml',
    projects: 'data/projects.yaml',
    etc: 'data/etc.yaml',
    articles: 'data/articles.yaml'
  }))
  .use(layouts({
    directory: './layouts', default: 'index.hbs'
  }))
  .build((err) => {
    if (err) logger(err);
    ncp(outputpath.source, outputpath.destination, (errcopy) => {
      if (errcopy) {
        return console.error('copying ' + err);
      }
      console.log('Done!');
      return null;
    });
  });
