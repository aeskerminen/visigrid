let arr = [];

const gridSize = 35;

const width = 700;
const height = 700;

const setupGrid = () => {
  for (let i = 0; i < width / gridSize; i++) {
    arr[i] = [];
    for (let j = 0; j < height / gridSize; j++) {
      arr[i][j] = "empty";
    }
  }

  arr[1][1] = "start";
  arr[18][18] = "end";
};

const render = (ctx) => {
  for (let i = 0; i < width / gridSize; i++) {
    for (let j = 0; j < height / gridSize; j++) {
      const cur = arr[i][j];
      if (cur === "wall") {
        ctx.fillStyle = "rgb(255 255 255)";
      } else if (cur === "empty") {
        ctx.fillStyle = "rgb(200 300 100)";
      } else if (cur === "start") {
        ctx.fillStyle = "rgb(0 0 100)";
      } else if (cur === "searched") {
        ctx.fillStyle = "rgb(0 0 0)";
      } else {
        ctx.fillStyle = "rgb(100 0 0 )";
      }

      ctx.fillRect(i * gridSize, j * gridSize, gridSize - 2, gridSize - 2);
    }
  }
};

const djikstras = (source) => {
  console.log("Running Djikstra's algorithm.");

  const toIndex = (x, y) => {
    return x * (width / gridSize) + y;
  };

  const toCoord = (index) => {
    return { x: Math.floor(index / (width / gridSize)), y: index % width };
  };

  let dist = [];
  let prev = [];

  const Q = new Set();

  for (let i = 0; i < width / gridSize; i++) {
    arr[i] = [];
    for (let j = 0; j < height / gridSize; j++) {
      dist[toIndex(i, j)] = Number.MAX_SAFE_INTEGER;
      prev[toIndex(i, j)] = undefined;
      Q.add(toIndex(i, j));
    }
  }

  dist[toIndex(source[0], source[1])] = 0;

  const minFromDist = () => {
    let mn = undefined;
    Q.forEach((s) => {
      if (mn === undefined) {
        mn = s;
      } else if (dist[s] < dist[mn]) {
        mn = s;
      }
    });

    return mn;
  };

  const neighbors = (index) => {
    const coord = toCoord(index);
    let res = [];

    console.log(coord);

    if (coord.x > 0) {
      res.push({ x: coord.x - 1, y: coord.y });
    }
    if (coord.x < width - 1) {
      res.push({ x: coord.x + 1, y: coord.y });
    }
    if (coord.y > 0) {
      res.push({ x: coord.x, y: coord.y - 1 });
    }
    if (coord.y < height - 1) {
      res.push({ x: coord.x, y: coord.y + 1 });
    }

    return res;
  };

  const weight = (index) => {
    const coord = toCoord(index);

    const val = arr[coord.x][coord.y];

    if (val === "wall") {
      return 1;
    } else if (val === "empty") {
      return 0;
    } else {
      return 0;
    }
  };

  while (Q.size > 0) {
    let u = minFromDist();
    Q.delete(u);

    neighbors(u).forEach((n) => {
      const index = toIndex(n.x, n.y);
      if (Q.has(index)) {
        const alt = dist[u] + weight(index);
        if (alt < dist[index]) {
          dist[index] = alt;
          prev[index] = u;
        }
      }
    });
  }

  console.log(dist);
  console.log(prev);
};

const main = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  setupGrid();

  render(ctx);
  djikstras([1, 1]);
};

window.addEventListener("load", () => {
  main();
});
