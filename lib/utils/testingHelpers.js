export function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, time);
    });
}
