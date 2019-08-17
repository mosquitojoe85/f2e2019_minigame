export const gameWidth = 1920;
export const gameHeight = 1080;
export const roadPosition = { gap: 140, min: 600, max: 880, x: 300 };
export const playTime = 10;
export const speed = [6];



const blockType = [ // 0 empty, 1 buff, 2 debuff
  [0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1], [2, 0, 0], [2, 2, 0], [1, 2, 2], [1, 1, 2],
];
const getRandomInt = (min, max) => {
  // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomBlock = () => blockType[getRandomInt(0, 7)];

export const getRandomRoadIndex = (road = [0, 1, 2]) => {
  const randomRoadIndex = getRandomInt(0, road.length - 1);
  return [randomRoadIndex, road.filter((el, i) => {
    return i !== randomRoadIndex;
  })];
};
