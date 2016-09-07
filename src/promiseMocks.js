// http://localhost:9001/#/contacts/3
(function() {
    'use strict';
    class Deferred {
        constructor() {
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }
    }

    class DeferredTask extends Deferred {
        run() {
            return this.promise;
        }

        static called(name) {
            var dt = new this();
            dt.name = name;
            return dt;
        }
    }

    window.DeferredTask = DeferredTask;

    function simpleRun() {
        deferredTask1.run().then((result) => {
            console.log('Result:', result);
        });
    }

    function logData(data) {
        console.log('Data:', data);
    }

    function logError() {
        console.error(...['Promise rejection:', ...arguments]);
    }

    function logResult() {
        console.log(...['Promise resolution:', ...arguments]);
    }

    function fetchData() {
        // return fetch('www.datasource.test');
        return Promise.resolve(`{
            "name": "Buddy Bear"
        }`);
    }

    function processJsonData(responseData) {
        return JSON.parse(responseData);
    }

    window.mocks = {
        simpleRun,
        logData,
        logError,
        logResult,
        fetchData,
        processJsonData
    };
})();
