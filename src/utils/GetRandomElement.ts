const pow = (number) => number*number

const GetRandomElement = (arr) => arr[Math.floor((1 - pow(Math.random())) * arr.length)];

export default GetRandomElement