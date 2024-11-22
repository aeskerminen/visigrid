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

  while (Q.size > 0) {
    let u = minFromDist();
    Q.delete(u);
    console.log(Q.size);
  }
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
