import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('5.txt');
const input: string[][] = data.split('\n\n').map(block => block.split('\n'))
// console.log(a(input));
console.log(b(input));

function a(input: string[][]) {
    const freshRanges = input[0].map(line => line.split('-').map(num => parseInt(num)));
    const available = input[1].map(line => parseInt(line));

    return available.filter(ingredient => freshRanges.find(range => ingredient >= range[0] && ingredient <= range[1])).length;
}

function b(input: string[][]) {
    let freshRanges = input[0].map(line => line.split('-').map(num => parseInt(num))).toSorted((a, b) => a[0] - b[0]);

    let totalFresh = 0;
    let idCursor = 0;
    while(freshRanges.length) {
        const rangeLow = freshRanges.splice(0, 1)[0];
        let lowest = Math.max(idCursor, rangeLow[0]);
        if (lowest > idCursor) totalFresh++;
        idCursor = rangeLow[1];
        totalFresh += idCursor - lowest;
        freshRanges = freshRanges.filter(range => range[0] > idCursor || range[1] > idCursor);
        // console.log({
        //     rangeLow,
        //     lowest,
        //     idCursor,
        //     totalFresh,
        //     left: freshRanges.length
        // })
    }

    return totalFresh;
}
