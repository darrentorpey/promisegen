
function reduceByPercent(num, percent) {
    return num * (1 - ((percent/100)));
}

function makeReductionGenerator(reducer) {
    return function* reductionGenerator(num=100) {
        var new_num = num;

        do {
            yield new_num;

            num = new_num;

            let new_num_raw = reducer(num);

            if (typeof(new_num_raw) !== 'number') {
                console.error(new_num_raw);
                throw Error('Reducer returned a non-number result');
            }

            new_num = Math.round(new_num_raw);
        } while (num != new_num)
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
