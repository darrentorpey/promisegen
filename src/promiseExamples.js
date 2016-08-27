window.deferredTask1 = new DeferredTask('Deferred Task One');

function example() {
    var arg = 'run';
    var obj = {
        func: () => {}
    };

    // ES6 spread operator
    obj.func(...[arg, ...arguments]);
    // is equivalent to:
    obj.func.apply(obj, [arg].concat(arguments));

    fetchData().then(processJsonData).then(logData);

    fetchData().catch((error) => { console.error(error); });
    // is equivalent to:
    fetchData().then(undefined, (error) => { console.error(error); });

    fetchData().catch(logError);
    // is equivalent to:
    fetchData().then(undefined, logError);

    fetchData().then(logResult).catch(logError);
    // is NOT equivalent to:
    fetchData().then(logResult, logError);

    // observe:
    fetchData().then(logResult).then(undefined, logError);
    // is NOT equivalent to:
    fetchData().then(logResult, logError);

    /**
     * In a way, .catch() could read as .thenCatch() -- KEEP THIS IN MIND!
     * When in doubt, write the .catch((error) => {}) out as a .then(undefined, (error) => {}) instead
     */
}

window.deferredTask1 = new DeferredTask('Deferred Task One');

function getData() {
    return mocks.fetchData().then((result) => {
        console.log('Result:', result);
        return mocks.processJsonData(result);
    }, (error) => {
        console.error(error);
    }).catch((error) => {
        console.error('Failed', error);
    });
}

getData();
