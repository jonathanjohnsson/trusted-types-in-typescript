// Will my IdBrand class exist in the compiled code?

// Consider incorporating this:
export type Id = string & { readonly __brand: unique symbol }; // length 8, no spaces

// Look closer into this example:
// https://github.com/Microsoft/TypeScript/issues/202#issuecomment-436900738
// https://github.com/Microsoft/TypeScript/issues/202#issuecomment-494183625
// https://github.com/Microsoft/TypeScript/issues/202#issuecomment-494200540

///////////////////////////////////////////////////////
// https://github.com/Microsoft/TypeScript/issues/202#issuecomment-468500985

type O1 = any extends infer O | any ? O : never;
type O2 = any extends infer O | any ? O : never;
let o1: O1;
let o2: O2;
o1 = o2; // error
o2 = o1; // error

////////////////////////////////////////////////
declare const A: unique symbol;
declare const B: unique symbol;

type MyNominalType1 = typeof A & { memberA: string; memberB: number };
type MyNominalType2 = typeof B & { memberA: string; memberB: number };
type MyNominalType3 = typeof B & number; // never! doesn't work with primitives!

declare let x: MyNominalType1;
declare let y: MyNominalType2;

x = y; // assignability error
y = x; // assignability error


//////////////////////////////////////////////¨

const InputConnectorIdentity = Symbol("InputConnector");
const OutputConnectorIdentity = Symbol("OutputConnector");

type GraphNode = {
    inputs: InputConnector[];
    outputs: OutputConnector[];
}

const createNode = (): GraphNode => ({
    inputs: [],
    outputs: []
});

type Connector = {
    node: GraphNode;
};

type InputConnector = typeof InputConnectorIdentity & Connector;
type OutputConnector = typeof OutputConnectorIdentity & Connector;

const createConnector = (node: GraphNode) => ({
    node: node
});

const createInputConnector:
    (node: GraphNode) => InputConnector =
    <any>createConnector;

const createOutputConnector:
    (node: GraphNode) => OutputConnector =
    <any>createConnector;

const node1 = createNode();
const node2 = createNode();

const input = createInputConnector(node2);
const output = createOutputConnector(node2);

node1.inputs.push(input); // works
node1.inputs.push(output); // error: Argument of type 'OutputConnector' is not assignable to parameter of type 'InputConnector'
