const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata');
const ncp = require('ncp');

const config = {};
config.src = './src';
config.build = './build';
config.ignore = './__helpers/**';

const outputpath = {};
outputpath.source = config.build + '/index.html';
outputpath.destination = '../index.html';

const logger = err => console.log(err);

/* ./index.html */

metalsmith(__dirname)
  .source(config.src)
  .ignore([config.ignore])
  .destination(config.build)
  .use(metadata({
    meta: 'data/meta.yaml',
    projects: 'data/projects.yaml',
    etc: 'data/etc.yaml',
    ds: 'data/ds.yaml'
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

/* ds microsite */

const dsConfig = {};
dsConfig.src = './srcDS';
dsConfig.build = './buildDS';
dsConfig.ignore = './__helpers/**';

const dsOutputpath = {};
dsOutputpath.source = dsConfig.build + '/index.html';
dsOutputpath.destination = '../ds/index.html';

metalsmith(__dirname)
  .source(dsConfig.src)
  .ignore([dsConfig.ignore])
  .destination(dsConfig.build)
  .use(metadata({
    meta: 'data/meta.yaml',
    analyses: 'data/analyses.yaml',
    explorables: 'data/explorables.yaml',
    articles: 'data/articles.yaml'
  }))
  .use(layouts({
    directory: './layoutsDS', default: 'index.hbs'
  }))
  .build((err) => {
    if (err) logger(err);
    ncp(dsOutputpath.source, dsOutputpath.destination, (errcopy) => {
      if (errcopy) {
        return console.error('copying ' + err);
      }
      console.log('Done!');
      return null;
    });
  });
