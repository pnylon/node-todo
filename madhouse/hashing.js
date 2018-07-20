const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};

let token = jwt.sign(data, '123abc');
let decoded = jwt.verify(token, '123abc');

console.log(token);
console.log('Decoded: ', decoded);

// First is header - Second is the payload, our information - Third is the hash. 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUzMjAxMjIyNH0.7PML9elvgalzBDQhrnw9Gl5ZOMwQoJ - J0fXL62b2fKY

////////////// Using crypto-js for testing
// let message =  'User number 3';

// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 4
// };
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'sprinklesalt').toString()
// };

// // Change data to make it bad.
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'sprinklesalt').toString();

// if (resultHash === token.hash) {
//     console.log('Data is good');
// } else {
//     console.log('Data is bad');
// }