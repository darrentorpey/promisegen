
function reduceByPercent(num, percent) {
    return num * (1 - ((percent/100)));
}

function makeReductionGenerator(reducer) {
    function reduce(num) {
        var new_num_raw = reducer(num);

        if (typeof(new_num_raw) !== 'number') {
            console.error(new_num_raw);
            throw Error('Reducer returned a non-number result');
        }

        return Math.round(new_num_raw);
    }

    return function* reductionGenerator(num=100) {
        yield num;

        var my_new_num = reduce(num);

        while (my_new_num !== num) {
            yield my_new_num;

            num = my_new_num;

            my_new_num = reduce(my_new_num);
        }

        console.log('done');
    };
}

class Reducer {
    static create({ percent } = {}) {
        function reducer(num) {
            return reduceByPercent(num, percent);
        }

        return makeReductionGenerator(reducer);
    }

    static createAsync({ percent } = {}) {
        function reducer(num) {
            return new Promise.resolve(reduceByPercent(num, percent));
        }

        return makeReductionGenerator(reducer);
    }

    static reduceDown({ percent }) {
        for (let x of this.create({ percent })()) { console.log(x); }
    }
}

window.Reducer = Reducer;
