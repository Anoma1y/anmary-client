const path = require('path');
const copydir = require('copy-dir');
const COPY_FROM = './public';
const COPY_TO = './build';

copydir(COPY_FROM, COPY_TO, function(stat, filepath, filename) {
  // Custom file handling
  // Return 'true' to pass file
  // Return 'false' to reject file

  return true;
}, function(error) {
  // Error handling
});
