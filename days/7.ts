import { DefaultDeserializer } from "v8";
import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('7.txt');

console.log('Parsing input');

const input: string[][] = data.split('\n').map(line => line.split(''));

// console.log(a(input));
console.log(b(input));

function a(input: string[][]) {
    let beamPoints: number[] = []
    let splits = 0;
    for (let lineIdx = 0; lineIdx < input.length; lineIdx++) {
        let line = input[lineIdx];
        beamPoints = line.map((cell, idx) => ({cell, idx})).filter(val => val.cell === 'S' || val.cell === '|').map(val => val.idx);
        if (lineIdx+1 === input.length) break;
        let nextLine = input[lineIdx+1];
        beamPoints.forEach((beamIdx) => {
            if (nextLine[beamIdx] === '.') {
                nextLine[beamIdx] = '|';
            } else if (nextLine[beamIdx] === '^') {
                splits++;
                if (nextLine[beamIdx-1]) nextLine[beamIdx-1] = '|';
                if (nextLine[beamIdx+1]) nextLine[beamIdx+1] = '|';
            }
        })
    }

    return splits;
}

interface Cell {
    val: string,
    idx: number
    timelines: number;
}

function b(inputB: string[][]) {
    const input: Cell[][] = inputB.map(line => line.map((cell, idx): Cell => (({val: cell, idx, timelines: 0}) as Cell)));
    const start = input[0].find(cell => cell.val === 'S');
    if (start) start.timelines++;
    let beamPoints: Cell[] = []
    for (let lineIdx = 0; lineIdx < input.length; lineIdx++) {
        let line = input[lineIdx];
        // console.log(line);
        console.log(line.reduce((sum, cur) => sum + cur.timelines, 0))
        beamPoints = line.filter(cell => cell.val === 'S' || cell.val === '|');
        if (lineIdx+1 === input.length) break;
        let nextLine = input[lineIdx+1];
        beamPoints.forEach((cell) => {
            if (nextLine[cell.idx].val === '^') {
                if (nextLine[cell.idx-1]) {
                    nextLine[cell.idx-1].val = '|';
                    nextLine[cell.idx-1].timelines += cell.timelines;
                }
                if (nextLine[cell.idx+1]) {
                    nextLine[cell.idx+1].val = '|';
                    nextLine[cell.idx+1].timelines += cell.timelines;
                }
            } else {
                nextLine[cell.idx].val = '|';
                nextLine[cell.idx].timelines += cell.timelines;
            }
        });
    }

    return input[input.length-1].reduce((sum, cur) => sum + cur.timelines, 0);
}