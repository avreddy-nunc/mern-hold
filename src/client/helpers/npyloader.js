(function(G) {

    class npyjs {
        constructor(opts) {
            if (opts) {
                console.error([
                    "No arguments accepted to npyjs constructor.",
                    "For usage, go to https://github.com/jhuapl-boss/npyjs."
                ].join(" "));
            }
        }

        _parseBytes(a) {
            /*
            Parses an array of bytes, assuming that the n-1th byte is 2^0s, the
            n-2th is 2^8, etc.
            Arguments:
                a (array): An array of integers, in faux-base-256. For instance,
                    [100] => 100; [1, 0] => 256. [256] is an invalid input.
            Returns:
                Integer
            */
            let result = 0;
            for (var i = 0; i < a.length; i++) {
                result += a[i] * Math.pow(256, i);
            }
            return result;
        }

        load(filename, callback) {
            /*
            Loads an array from a stream of bytes.
            */
            let self = this;
            return
        }
    }

    G.npyjs = npyjs;
})(this);
