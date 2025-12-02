const fs = require('fs');
const { off } = require('process');

fs.readFile( __dirname + '/inputs/2.txt', function (err, data) {
    if (err) {
        throw err;
    }

    const input = data.toString().split(',').map(line => line.split('-').map(num => parseInt(num)));

    // console.log(a(input));
    console.log(b(input));
});

function a(input) {
    return input.reduce((sum, cur, idx) => {
        let total = 0;
        for (let i = cur[0]; i <= cur[1]; i++) {
            let strI = i.toString();
            if (strI.length % 2 === 0) {
                if ( strI.slice(0, strI.length/2) === strI.slice(strI.length/2)){
                    total += i;
                }
            }
        }
        return sum + total;
    }, 0);
}

function b(input) {
    return input.reduce((sum, cur, idx) => {
        let total = 0;
        for (let i = cur[0]; i <= cur[1]; i++) {
            let strI = i.toString();
            // console.log({sum, cur, i});
            for (let j = 1; j <= strI.length/2; j++) {
                // console.log(j)
                if (strI.length % j === 0) {
                    // let arr = strI.match(new RegExp('/.{' + j + '}/g'));
                    let arr = strI.match(new RegExp(".{1," + j + "}", "g"));
                    // console.log(j, arr);
                    if (arr !== null && arr.every( (val, i, arr) => val === arr[0])) {
                        console.log(i);
                        total += i;
                        break;
                    }
                }
            }
        }

        return sum + total;
    }, 0);
}
