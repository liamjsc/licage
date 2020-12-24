// const localUrl = 'http://192.168.3.110:8000/api'
const localUrl = 'http://localhost:8000/api'
const prodUrl = 'http://ec2-52-13-30-170.us-west-2.compute.amazonaws.com:8000/api';

const { NODE_ENV } = process.env;
const __DEVELOPMENT__ = NODE_ENV === 'development';

let useProd;
// useProd = true; // comment this line for convenience
const api = (__DEVELOPMENT__ && !useProd) ? localUrl : prodUrl;

console.log(`
NODE_ENV: ${NODE_ENV}
useProd: ${useProd}
api: ${api}
`);

export {
  api,
};