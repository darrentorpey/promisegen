function asyncGen(generator) {
    for (x of generator()) { console.log(x); }
    // return new Promise(function (resolve, reject) {
    //     function step(key, arg) {
    //         try {
    //             var info = gen[key](arg);
    //             var value = info.value;
    //         } catch (error) {
    //             reject(error);
    //             return;
    //         }

    //         if (info.done) {
    //             resolve(value);
    //         } else {
    //             return _promise2.default.resolve(value).then(function (value) {
    //                 return step('next', value);
    //             }, function (err) {
    //                 return step('throw', err);
    //             });
    //         }
    //     }

    //     return step('next');
    // });
}

window.asyncGen = asyncGen;
