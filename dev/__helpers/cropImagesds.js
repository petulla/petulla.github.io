const compressImages = require('compress-images');
const ncp = require('ncp');
const rimraf = require('rimraf');

// https://gist.github.com/jxson/1266641
const input = '__helpers/dsdata/*.png';
const output = '__helpers/dsbuild/';
const options = {compress_force: false, statistic: true, autoupdate: true};
const source = output;
const destination = './../ds/img';

rimraf(output + '*', () => {
  compressImages(input, output, options, false,
    {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
	  {png: {engine: 'pngquant', command: ['--quality=80-100']}},
	  {svg: {engine: 'svgo', command: '--multipass'}},
	  {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, (err) => {
	    if (err) {
	      return console.err('building ' + err);
	    }
	 		console.log('success building');
	    ncp(source, destination, (errcopy) => {
			  if (errcopy) {
			    return console.error('copying ' + err);
			  }
			  console.log('done!');
			  return null;
	    });
	    return null;
    });
});
