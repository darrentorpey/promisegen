
function reduceByPercent(num, percent) {
    return num * (1 - ((percent/100)));
}

class Reducer {
    static create({ percent }) {
        function reducer(num) {
            return reduceByPercent(num, percent);
        }

        return function* reductionGenerator(num=100) {
            var new_num = num;

            do {
                yield new_num;

                num = new_num;

                new_num = Math.round(reducer(num));
            } while (num != new_num)
        };
    }

    static reduceDown({ percent }) {
        for (let x of this.create({ percent })()) { console.log(x); }
    }
}

window.Reducer = Reducer;
