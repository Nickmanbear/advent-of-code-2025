const fs = require('fs');

fs.readFile( __dirname + '/inputs/1-test2.txt', function (err, data) {
    if (err) {
        throw err;
    }

    const input = data.toString().split('\n').map(line => ({dir: line[0], amount: parseInt(line.slice(1))}));

    console.log(a2(input));
    // console.log(b(input));
});

function a(input) {
    let count = 0;
    let dial = 50;
    input.forEach(move => {
        const dialBefore = dial;
        if (move.dir === 'R') {
            dial += move.amount;

        }
        if (move.dir === 'L') {
            dial -= move.amount;

        }
        if (dial > 99) {
            dial = (dial - 100)
        }
        if (dial < 0) {
            dial = (dial + 100)
        }
        if (dial === 0) count++;
        console.log({dialBefore, dial, count, move});
    });

    return count;
}

function a2(input) {
    let dial = 50;
    let count = 0;
    input.forEach(move => {
        if (move.dir === 'R') {
            dial += move.amount;

        }
        if (move.dir === 'L') {
            dial -= move.amount;

        }
        if (dial % 100 === 0) {
            count++;
        }
        console.log({dial, count, move});
    });

    return count;
}

function b(input) {
    let dial = 50;
    let count = 0;
    input.forEach(move => {
        console.log({dial, move})
        for (let i = 0; i < move.amount; i++) {
            dial = move.dir === 'R' ? dial+1 : dial-1;
            if (dial === 100) dial = 0;
            if (dial === -1) dial = 99;
            if (dial === 0) count++;
            // console.log({dial, count});
        }
    });

    return count;
}
