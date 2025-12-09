import { DefaultDeserializer } from "v8";
import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('9.txt');

console.log('Parsing input');

interface Coord {
    idx: number,
    x: number,
    y: number,
    // color: string,
}

const input: Coord[] = data.split('\n').map(line => line.split(',')).map((line, idx) => ({idx, x: parseInt(line[0]), y: parseInt(line[1])}) as Coord)

// console.log(a(input));
// console.log(b(input));
console.log(b2(input));

function a(input: Coord[]) {
    return input.reduce((largestArea: number, coordA: Coord) => {
        return Math.max(largestArea, input.reduce((largestAreaInner: number, coordB: Coord) => {
            let area = (Math.abs(coordA.x - coordB.x)+1) * (Math.abs(coordA.y - coordB.y)+1);
            console.log({coordA, coordB, area})
            return Math.max(area, largestAreaInner);
        }, 0));
    }, 0)
}


function b(input: Coord[]) {

    // let limitX = input.reduce((maxX, coord) => Math.max(maxX, coord.x), 0);
    // let limitY = input.reduce((maxY, coord) => Math.max(maxY, coord.y), 0);
    // console.log({limitX, limitY});
    // return;
    // let floor = new Map();
    // input.forEach((coordA, idx) => {
    //     floor.set(`${coordA.x},${coordA.y}`, 'red');
    //     let nextCoord = input[idx+1] ?? input[0];
    //     if (coordA.x === nextCoord.x) {
    //         let left = coordA.y < nextCoord.y;
    //         let cur = left ? coordA.y-1 : coordA.y+1;
    //         while (left ? cur > nextCoord.y : cur < nextCoord.y) {
    //             floor.set(`${coordA.x},${cur}`, 'green');
    //             left ? cur-- : cur++;
    //         }
    //     } else {
    //         let left = coordA.x < nextCoord.x;
    //         let cur = left ? coordA.x-1 : coordA.x+1;
    //         while (left ? cur > nextCoord.x : cur < nextCoord.x) {
    //             floor.set(`${cur},${coordA.y}`, 'green');
    //             left ? cur-- : cur++;
    //         }
    //     }
    // })

    return input.reduce((largestArea: number, coordA: Coord) => {
        return Math.max(largestArea, input.reduce((largestAreaInner: number, coordB: Coord) => {
            let minX = Math.min(coordA.x, coordB.x);
            let maxX = Math.max(coordA.x, coordB.x);
            let minY = Math.min(coordA.y, coordB.y);
            let maxY = Math.max(coordA.y, coordB.y);
            let area = (Math.abs(coordA.x - coordB.x)+1) * (Math.abs(coordA.y - coordB.y)+1);
            if (area < largestAreaInner) return largestAreaInner;
            let innerCoord = input.find(coordC => coordC.x > minX && coordC.x < maxX && coordC.y > minY && coordC.y < maxY);
            if (innerCoord) return largestAreaInner;
            let lineCoords = input.filter(coordC => coordC.idx !== coordA.idx && coordC.idx !== coordB.idx && coordC.x >= minX && coordC.x <= maxX && coordC.y >= minY && coordC.y <= maxY);
            // console.log({lineCoord});
            if (lineCoords.length === 0) return area;
            console.log({coordA, coordB, largestAreaInner, area, lineCoords});

            for (let lineCoord of lineCoords) {
                let linePrev = input[lineCoord.idx-1] ?? input[input.length-1];
                let lineNext = input[lineCoord.idx+1] ?? input[0];

                let prevX = null;
                let prevY = null;
                if (linePrev.x === lineCoord.x) {
                    prevX = linePrev.x;
                    prevY = linePrev.y < lineCoord.y ? lineCoord.y-1 : lineCoord.y+1;
                } else {
                    prevY = linePrev.y;
                    prevX = linePrev.x < lineCoord.x ? lineCoord.x-1 : lineCoord.x+1;
                }
                
                if (prevX > minX && prevX < maxX && prevY > minY && prevY < maxY) {
                    return largestAreaInner;
                }

                let nextX = null;
                let nextY = null;
                if (lineNext.x === lineCoord.x) {
                    nextX = lineNext.x;
                    nextY = lineNext.y < lineCoord.y ? lineCoord.y-1 : lineCoord.y+1;
                } else {
                    nextY = lineNext.y;
                    nextX = lineNext.x < lineCoord.x ? lineCoord.x-1 : lineCoord.x+1;
                }

                if (nextX > minX && nextX < maxX && nextY > minY && nextY < maxY) {
                    return largestAreaInner;
                }

                // let cornerX = null;
                // let cornerY = null;
                // if (linePrev.x === lineCoord.x) {
                //     cornerY = linePrev.y < lineCoord.y ? lineCoord.y-1 : lineCoord.y+1;
                //     cornerX = lineNext.x < lineCoord.x ? lineCoord.x-1 : lineCoord.x+1; 
                // } else {
                //     cornerX = linePrev.x < lineCoord.x ? lineCoord.x-1 : lineCoord.x+1;
                //     cornerY = lineNext.y < lineCoord.y ? lineCoord.y-1 : lineCoord.y+1; 
                // }
                
                // console.log({lineCoord, linePrev, lineNext, cornerX, cornerY, minX, maxX, minY, maxY});

                // if (!(cornerX > minX && cornerX < maxX && cornerY > minY && cornerY < maxY)) {
                //    return largestAreaInner;
                // }
            }

            console.log({coordA, coordB, area});
            return area;
        }, 0));
    }, 0)
}

function b2(input: Coord[]) {
    return input.reduce((largestArea: number, coordA: Coord) => {
        return Math.max(largestArea, input.reduce((largestAreaInner: number, coordB: Coord) => {
            let minX = Math.min(coordA.x, coordB.x);
            let maxX = Math.max(coordA.x, coordB.x);
            let minY = Math.min(coordA.y, coordB.y);
            let maxY = Math.max(coordA.y, coordB.y);
            let area = (Math.abs(coordA.x - coordB.x)+1) * (Math.abs(coordA.y - coordB.y)+1);
            if (largestArea > area) return largestAreaInner;

            let corners = [
                {idx: 0, x: minX+0.1, y: minY+0.1} as Coord,
                {idx: 1, x: minX+0.1, y: maxY-0.1} as Coord,
                {idx: 2, x: maxX-0.1, y: maxY-0.1} as Coord,
                {idx: 3, x: maxX-0.1, y: minY+0.1} as Coord,
            ];

            console.log({coordA, coordB, area, largestAreaInner, largestArea});
            // console.log({corners});

            let crosses = corners.some(corner => {
                let anyCross = input.some(coordC => {
                    let nextCorner = corners[corner.idx+1] ?? corners[0];
                    let nextCoord = input[coordC.idx+1] ?? input[0];
                    if (corner.x === nextCorner.x && coordC.x === nextCoord.x) return false;
    
                    let horiStart = null;
                    let horiEnd =  null
                    let vertStart = null
                    let vertEnd = null
                    if (corner.x === nextCorner.x) {
                        horiStart = coordC.x < nextCoord.x ? coordC : nextCoord;
                        horiEnd =  coordC.x < nextCoord.x ? nextCoord : coordC;
                        vertStart = corner.y < nextCorner.y ? corner : nextCorner;
                        vertEnd = corner.y < nextCorner.y ? nextCorner : corner;
                    } else {
                        horiStart = corner.x < nextCorner.x ? corner : nextCorner;
                        horiEnd =  corner.x < nextCorner.x ? nextCorner : corner;
                        vertStart = coordC.y < nextCoord.y ? coordC : nextCoord;
                        vertEnd = coordC.y < nextCoord.y ? nextCoord : coordC;
                    }

                    // console.log({horiStart, horiEnd, vertStart, vertEnd});

                    return vertStart.x > horiStart.x && vertStart.x < horiEnd.x &&
                        horiStart.y > vertStart.y && horiStart.y < vertEnd.y;
                });
                // console.log({corner, anyCross});
                return anyCross;
            });

            console.log({crosses});

            if (crosses) return largestAreaInner;

            return area;
        }, 0));
    }, 0)
}

