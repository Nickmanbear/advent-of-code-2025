import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('4.txt');
const input: string[][] = data.split('\n').map(line => line.split(''));

// console.log(a(input));
console.log(b(input));


function a(input: string[][]) {
    let height = input.length;
    let width = input[0].length;

    let accessable = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (input[y][x] === '.') continue;

            let rolls = 0;
            if (input[y-1] !== undefined) {
                if (input[y-1][x-1] === '@') rolls++;
                if (input[y-1][x] === '@') rolls++;
                if (input[y-1][x+1] === '@') rolls++;
            }

            
            if (input[y] !== undefined) {
                if (input[y][x-1] === '@') rolls++;
                if (input[y][x+1] === '@') rolls++;
            }

            
            if (input[y+1] !== undefined) {
                if (input[y+1][x-1] === '@') rolls++;
                if (input[y+1][x] === '@') rolls++;
                if (input[y+1][x+1] === '@') rolls++;
            }
            console.log({y, x, rolls, accessable: rolls < 4})
            if (rolls < 4) accessable++;
        }
    }

    return accessable;
}

function b(input: any[]) {
    let height = input.length;
    let width = input[0].length;

    let accessableBefore = 0;
    let accessableAfter = -1;
    let removed = 0;

    let i = 0;
    while (accessableBefore !== accessableAfter) {
        console.log(i);
        i++;
        accessableAfter = accessableBefore;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (input[y][x] === '.' || input[y][x] === 'x') continue;

                let rolls = 0;
                if (input[y-1] !== undefined) {
                    if (input[y-1][x-1] === '@') rolls++;
                    if (input[y-1][x] === '@') rolls++;
                    if (input[y-1][x+1] === '@') rolls++;
                }

                
                if (input[y] !== undefined) {
                    if (input[y][x-1] === '@') rolls++;
                    if (input[y][x+1] === '@') rolls++;
                }

                
                if (input[y+1] !== undefined) {
                    if (input[y+1][x-1] === '@') rolls++;
                    if (input[y+1][x] === '@') rolls++;
                    if (input[y+1][x+1] === '@') rolls++;
                }

                if (rolls < 4) {
                    input[y][x] = 'x';
                    accessableAfter++;
                    removed++;
                };
            }
        }
    }

    return removed;
}
