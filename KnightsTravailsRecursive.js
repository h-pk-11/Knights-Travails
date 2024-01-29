class KnightGraph {
  constructor() {
    this.buildGraph();
  }

  moves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  validNeighbors(r, c) {
    let neighborsArr = [];
    for (let [x, y] of this.moves) {
      if (x + r >= 0 && x + r < 8 && y + c >= 0 && y + c < 8) {
        neighborsArr.push([x + r, y + c]);
      }
    }
    return neighborsArr;
  }

  buildGraph() {
    let graph = [];
    for (let i = 0; i < 8; ++i) {
      graph[i] = [];
      for (let j = 0; j < 8; ++j) {
        graph[i][j] = this.validNeighbors(i, j);
      }
    }
    this.graph = graph;
  }

  static interpretResult({ steps, map }) {
    let path = "";
    for (let i = 0; i < map.length; i++) {
      if (i !== map.length - 1) {
        path += `[${map[i]}], `;
      } else {
        path += `[${map[i]}]`;
      }
    }
    return `Knight travels in ${steps === Infinity ? -1 : steps} steps,\nMap: ${
      steps === Infinity ? "Unfound" : path
    }`;
  }

  knightMoves(src, dist, visitedVertices = new Set()) {
    if (String(src) === String(dist)) {
      return {
        steps: 0,
        map: [src],
        toString() {
          let steps = this.steps;
          let map = this.map;
          return KnightGraph.interpretResult({ steps, map });
        },
      };
    }

    if (this.graph[src[0]][src[1]].includes(dist)) {
      return {
        steps: 1,
        map: [src, dist],
        toString() {
          let steps = this.steps;
          let map = this.map;
          return KnightGraph.interpretResult({ steps, map });
        },
      };
    }

    if (visitedVertices.has(String(src))) {
      return {
        steps: Infinity,
        map: [],
      };
    }
    visitedVertices.add(String(src));
    let roads = [];
    for (let vertex of this.graph[src[0]][src[1]]) {
      const { steps, map } = this.knightMoves(vertex, dist, visitedVertices);
      roads.push({
        steps: steps + 1,
        map: [src, ...map],
        toString() {
          let steps = this.steps;
          let map = this.map;
          return KnightGraph.interpretResult({ steps, map });
        },
      });
    }
    roads.sort((a, b) => a.steps - b.steps);
    return roads[0];
  }
}

const knightGraph = new KnightGraph();
const road = knightGraph.knightMoves([0, 0], [1, -7]);
console.log(road.toString());
