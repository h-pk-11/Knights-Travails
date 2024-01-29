const knightGraph = (() => {
  const moves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const validNeighbors = (r, c) => {
    let neighborsArr = [];
    for (let [x, y] of moves) {
      if (x + r >= 0 && x + r < 8 && y + c >= 0 && y + c < 8) {
        neighborsArr.push([x + r, y + c]);
      }
    }
    return neighborsArr;
  };

  let graph = [];
  for (let i = 0; i < 8; ++i) {
    graph[i] = [];
    for (let j = 0; j < 8; ++j) {
      graph[i][j] = validNeighbors(i, j);
    }
  }

  return graph;
})();

const knightMoves = (src, dist) => {
  const visited = new Set([String(src)]);
  const queue = [{ src, steps: 0, map: [src] }];

  while (queue.length !== 0) {
    const { src, steps, map } = queue.shift();
    if (String(src) === String(dist)) {
      return {
        steps,
        map,
      };
    }

    for (let neighbor of knightGraph[src[0]][src[1]]) {
      if (!visited.has(String(neighbor))) {
        visited.add(String(neighbor));
        queue.push({
          src: neighbor,
          steps: steps + 1,
          map: [...map, neighbor],
        });
      }
    }
  }

  return { steps: -1, map: ["unfound"] };
};

const result = knightMoves([0, 0], [-1, 7]);
console.log(`Knight travels in ${result.steps} steps`);
console.log(
  `Path: ${result.map.map((item) => {
    return `[${item}]`;
  })}`
);
