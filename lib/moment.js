// https://github.com/moment/moment/issues/2373
// get core, the core does nothing, no validation, no nothing
// it would only define a internal storage structure and the bare minimum
// methods for getting values out of it: day, month, year, etc (no "format"
// functions or "fromNow" since you might not even want to use them)
var moment = require('moment/core');

// add plugins for all the stuff you need, if you ever want ALL of them you
// just include the directory instead (node/browserify/webpack will pick up
// a index.js inside it that would have all the things)
moment.plugin([

    // if you know this is all the parsers you need this is all you add
    require('moment/plugins/parser/yyyy-mm-dd-time'),
    require('moment/plugins/parser/unixtime'),

    require('moment/plugins/validator/yyyy-mm-dd-time'),
    // if we don't use unixtime locally, only on server we dont care for that
    // when it comes to validation

    require('moment/plugins/fromNow'),
    require('moment/plugins/toUnixTime'),

    // with a modular structure we can add 3rd party stuff really easily
    require('moment-phpstyle-format'),
    require('moment-chained-functions-format')

]);

// lock in the configuration so that calling plugin method throw and exception
// this would be irreversible but you can get a unlocked version by calling copy
// this will force people to get a "copy" of the configuration before doing
// anything stupid -- or help them find the mistake if they add it later
moment.lock();

// you now just include this file where you need it
module.exports = moment;