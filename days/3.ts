import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('3.txt');
const input: string[] = data.split('\n');

// console.log(a(input));
console.log(b(input));


function a(input: any[]) {
    return input.reduce((sum: number, cur: any[], idx: any) => {
        console.log(cur);
        let bat1 = -1;
        let bat2 = -1;
        for (let i = 9; i >= 1; i--) {
            bat1 = cur.indexOf(i);
            // console.log({cur, i, j, bat1, bat2});
            if (bat1 !== -1) {
                for (let j = 9; j >= 1; j--) {
                    bat2 = cur.indexOf(j, bat1+1);
                    console.log({cur, i, j, bat1, bat2});
                    if (bat2 > bat1) {
                        break;
                    }
                }
                if (bat2 > bat1) {
                    break;
                }
            }
        }

        let joltage = cur[bat1] + cur[bat2];
        console.log({cur, bat1, bat2, joltage});

        return sum + parseInt(joltage);
    }, 0);
}

function b(input: any[]) {
    const searchBat = (bank: string, searchFrom = 0, joltage = '', depth = 0, limit = 12): number|null => {
        depth++;
        if (depth > limit) {
            return parseInt(joltage);
        }
        let bat = -1;
        for (let i = 9; i >= 1; i--) {
            bat = bank.indexOf(i.toString(), searchFrom);
            // console.log({bank, searchFrom, joltage, i, bat});
            // console.log({bank, searchFrom, bat});
            if (bat >= searchFrom) {
                let result = searchBat(bank, bat+1, joltage + bank[bat], depth, limit);
                if (result !== null) {
                    return result;
                }
            }
        }

        return null;
    }

    return input.reduce((sum: any, cur: any, idx: any) => {
        let bat =  searchBat(cur);;
        console.log({cur, bat});
        return sum + bat;
    }, 0);
}
