import { DefaultDeserializer } from "v8";
import { getFileContent } from "../helpers/ReadFromFile";

const data: string = getFileContent('8.txt');

console.log('Parsing input');

interface Coord {
    x: number,
    y: number;
    z: number,
    circuit: Circuit,
}

interface Connection {
    a: Coord,
    b: Coord,
    d: number,
}

interface Circuit {
    id: string,
    connections: Connection[],
    coords: Coord[],
}

const input: Coord[] = data.split('\n').map(line => line.split(',').map(coord => parseInt(coord))).map(coord => (
    {x: coord[0], y: coord[1], z: coord[2], circuit: {id: coord.join(','), connections: [], coords: []}} as Coord
));

// console.log(a(input));
console.log(b(input));

function pythagoras(a: Coord, b: Coord): Connection {
    return {
        a,
        b,
        d: Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
    } as Connection;
}

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) arr.splice(index, 1);
  return arr;
}

function a(input: Coord[]) {
    let connectionToMake = 1000;

    let circuits = input.map(coord => coord.circuit);
    let sortedConnections: Connection[] = [];
    input.forEach((coordA, idx) => {
        console.log({time: new Date().toTimeString(), idx, coordA});
        sortedConnections.push(
            ...input.filter((coordB) => coordB != coordA)
            .filter(coordB => Math.abs((coordA.x+coordA.y+coordA.z) - (coordB.x+coordB.y+coordB.z)) < 20000)
            .filter(coordB => sortedConnections.find(conn => conn.a == coordB) === undefined)
            .map((coordB) => pythagoras(coordA, coordB))
        );
    });
    sortedConnections = [...new Set(sortedConnections)].toSorted((a,b) => a.d-b.d);

    while (connectionToMake > 0) {
        connectionToMake--;
        let shortest = sortedConnections.shift();
        console.log({connectionToMake, shortest});
        // console.log({connectionToMake, shortest, circuitA: shortest?.a.circuit, circuitB: shortest?.b.circuit});
        if (shortest == undefined) break;
        if (shortest.a.circuit.id === shortest.b.circuit.id) continue;
        circuits = removeItem(circuits, shortest.b.circuit);
        shortest.a.circuit.connections.push(shortest, ...shortest.b.circuit.connections);
        shortest.a.circuit.connections.forEach(conn => {conn.a.circuit = shortest.a.circuit; conn.b.circuit = shortest.a.circuit});
    }

    circuits = circuits.map(circuit => {
        circuit.coords = [...new Set(circuit.connections.flatMap(conn => [conn.a, conn.b]))]
        return circuit;
    });
    
    console.log(circuits);

    return circuits.toSorted((a,b) => b.coords.length - a.coords.length).slice(0, 3).reduce((sum, cur) => sum * cur.coords.length, 1);
}


function b(input: Coord[]) {
    let connectionToMake = 1000;

    let circuits = input.map(coord => coord.circuit);
    let sortedConnections: Connection[] = [];
    input.forEach((coordA, idx) => {
        console.log({time: new Date().toTimeString(), idx, coordA});
        sortedConnections.push(
            ...input.filter((coordB) => coordB != coordA)
            .filter(coordB => Math.abs((coordA.x+coordA.y+coordA.z) - (coordB.x+coordB.y+coordB.z)) < 20000)
            .filter(coordB => sortedConnections.find(conn => conn.a == coordB) === undefined)
            .map((coordB) => pythagoras(coordA, coordB))
        );
    });
    sortedConnections = [...new Set(sortedConnections)].toSorted((a,b) => a.d-b.d);

    let ans = 0;
    while (connectionToMake > 0) {
        let shortest = sortedConnections.shift();
        console.log({connectionToMake, shortest});
        // console.log({connectionToMake, shortest, circuitA: shortest?.a.circuit, circuitB: shortest?.b.circuit});
        if (shortest == undefined) break;
        if (shortest.a.circuit.id === shortest.b.circuit.id) continue;
        circuits = removeItem(circuits, shortest.b.circuit);
        shortest.a.circuit.connections.push(shortest, ...shortest.b.circuit.connections);
        shortest.a.circuit.connections.forEach(conn => {conn.a.circuit = shortest.a.circuit; conn.b.circuit = shortest.a.circuit});
        ans = shortest.a.x * shortest.b.x;
        connectionToMake--;
    }

    circuits = circuits.map(circuit => {
        circuit.coords = [...new Set(circuit.connections.flatMap(conn => [conn.a, conn.b]))]
        return circuit;
    });
    
    console.log(circuits);

    return ans;
}
