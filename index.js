'use strict';

var utils = require('mout'),
    Parser = require('./lib/Parser'),
    Optimizer = require('./lib/Optimizer'),
    OptimizerClosure = require('./lib/OptimizerClosure'),
    esprima = require('esprima'),
    escodegen = require('escodegen');

module.exports = function (contents, options, callback) {
    callback = utils.lang.isFunction(options) ? options: callback;
    options = utils.object.deepMixIn({
        closure: false,
        esprimaOpts: {},
        escodegenOpts: {}
    }, options || {});

    // Enforce some options
    utils.object.mixIn(options.esprimaOpts, {
        comment: true,
        loc: true,
        range: true
    });
    utils.object.mixIn(options.escodegenOpts, {
        comment: true,
        escapeless: true
    });

    var ast = esprima.parse(contents, options.esprimaOpts),
        parser = new Parser(),
        optimizer = new Optimizer({ escodegen: options.escodegenOpts }),
        optimizerClosure = new OptimizerClosure({ escodegen: options.escodegenOpts }),
        errors = [],
        foundUsage = false,
        output;

    // Find usages
    parser.forEachUsage(ast, function (err, obj) {
        if (err) {
            return errors.push(err);
        }

        var slice = contents.slice(obj.ast.range[0], obj.ast.range[1]);
        foundUsage = true;

        // Use the closure optimizer if the user wants to use it
        // or if the default one can't be used
        if (options.closure || !optimizer.canOptimize(slice)) {
            optimizerClosure.optimize(obj);
        } else {
            optimizer.optimize(obj);
        }
    });

    // Only generate the if some dejavu usage was actually found
    if (foundUsage) {
        // Generate the source
        output = escodegen.generate(ast, options.escodegenOpts);
    } else {
        output = contents;
    }

    callback(errors, output);
};