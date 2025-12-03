import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('4-test.txt');
const input: string[] = data.split('\n');

console.log(a(input));
// console.log(b(input));


function a(input: any[]) {
    return input.reduce((sum: number, cur: any, idx: any) => {
        console.log(cur);

        return sum;
    }, 0);
}

function b(input: any[]) {
    return input.reduce((sum: number, cur: any, idx: any) => {
        console.log(cur);

        return sum;
    }, 0);
}
