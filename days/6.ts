import { DefaultDeserializer } from "v8";
import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('6.txt');

const inputA: string[][] = data.split('\n').map(line => line.split(' ').map(arg => arg.trim()).filter(arg => arg !== ''))
const inputB: string[][] = data.split('\n').map(line => line.split('').toReversed());

// console.log(a(inputA));
console.log(b2(inputB));

function a(input: string[][]) {
    const sums = input[0].length;
    const nums = input.length - 1;
    let grandTotal = 0;
    for (let i = 0; i < sums; i++) {
        console.log({sums, nums, firstNum: input[0][i]});
        let ans =  input[nums][i] === '*' ? 1 : 0;
        for (let j = 0; j < nums; j++) {
            let num = parseInt(input[j][i]);
            ans = input[nums][i] === '*' ? ans * num : ans + num;
            // console.log({sums, nums, num, op: input[nums][i], ans, grandTotal});
        }
        grandTotal += ans;
        // console.log({sums, nums, firstNum: input[0][i], ans, grandTotal});
    }

    return grandTotal;
}

function b(input: string[][]) {
    const sums = input[0].length;
    const nums = input.length - 1;
    let grandTotal = 0;
    for (let i = 0; i < sums; i++) {
        console.log({sums, nums, firstNum: input[0][i]});
        let ans =  input[nums][i] === '*' ? 1 : 0;

        let args = [];
        for (let j = 0; j < nums; j++) args.push(input[j][i]);
        var longest = args.reduce((a, b) => a.length > b.length ? a : b);
        let realArgs = [];
        for (let k = 1; k <= longest.length; k++) {
             let newNum = '';
             for (let j = 0; j < args.length; j++) {
                if (args[j][args[j].length-k] !== undefined) newNum += args[j][args[j].length-k];
             }
             realArgs.push(parseInt(newNum));
        }

        console.log({args, longest, realArgs})

        for (let j = 0; j < realArgs.length; j++) {
            let num = realArgs[j];
            ans = input[nums][i] === '*' ? ans * num : ans + num;
            console.log({sums, nums, num, op: input[nums][i], ans, grandTotal});
        }
        grandTotal += ans;
        console.log({sums, nums, firstNum: input[0][i], ans, grandTotal});
    }

    return grandTotal;
}

function b2(input: string[][]) {
    const lines = input.length;
    let nums: number[] = [];
    let grandTotal = 0;
    input[0].forEach((val, char) => {
        let num = '';
        let op = '';
        for (let line = 0; line < lines; line++) {
            let found = input[line][char];
            if (found === '*' || found === '+') {
                op = found;
                break;
            }
            if (found !== ' ') num += found;
        }

        if (num !== '') nums.push(parseInt(num));
        // console.log({val, char, num, op, nums});
        if (op !== '') {
            grandTotal += nums.reduce((sum, cur) => op === '*' ? sum * cur : sum + cur , op === '*' ? 1 : 0);
            nums = [];
            console.log({grandTotal})
        }
    });

    return grandTotal;
}
