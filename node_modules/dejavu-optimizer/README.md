dejavu optimizer
------

The `dejavu` optimizer analyzes your code, making [dejavu](https://github.com/IndigoUnited/dejavu) usages faster.   
Benchmarks: [jsperf](http://jsperf.com/oop-benchmark/107)



# What it does?

- Improves `$super()`, `$self` and `$static` usage
- Removes the need for wrappers, improving performance by a great margin
- Removes abstract functions from abstract classes
- Removes functions from interfaces
- Removes all `$locked` and `$member()` because they are not used in the loose version


# Usage

## Node script

There's a simple `nodejs` script located in the `bin` folder.
If you are optimizing your code for `nodejs` then pass the `--closure` option. This will boost the performance when running code in v8.
Please look at the jsperf results to see the difference in the different browsers.

Example usage:

`node optimizer < file_in.js > file_out.js`
`node optimizer --closure < file_in.js > file_out.closure.js`


## Programmatic

To use the `optimizer` programatically, please check `bin/optimizer` for an example.


## Tasks

`dejavu` comes with an `automaton` and `grunt` task.

Sample usage of `automaton`:

```js
var dejavuOptimizer = require('dejavu/tasks/optimizer.autofile');

module.exports = function (task) {
    task.do(dejavuOptimizer, {
        description: 'Optimize myfile',
        options: {
            closure: true, // defaults to false
            files: {
                'src/myfile.js': 'dst/myfile.opt.js'
            }
        }
    });
}
```

Sample usage of `grunt`:

```js
grunt.loadNpmTasks('dejavu');

grunt.initConfig({
    dejavuopt: {
        sometarget: {
            closure: true, // defaults to false
            files: {
                'dst/myfile.opt.js': 'src/myfile.js'
            }
        }
    }
});
```


## License ##

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).