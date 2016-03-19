var moment = require('moment');
var now = moment();
/*console.log(now.format());

//console.log(now.format('MMM Do YYYY, h:mm:ssa'));

console.log(now.format('X')); // seconds sinc eunix epich time
console.log(now.format('x')); //milliseconds since unix epoch time
console.log(now.valueOf());*/

var timestamp = now.valueOf();
var timestampMoment = moment.utc(timestamp).local();
console.log(timestampMoment.format('MMM Do YYYY, h:mm:ssa'));
// fix timezone offset

// convert utc to local offset