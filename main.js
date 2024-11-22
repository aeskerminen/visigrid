let arr = [];

const gridSize = 35;

const width = 700;
const height = 700;

let source = { x: 1, y: 1 };
let target = { x: 18, y: 18 };

const setupGrid = () => {
  for (let i = 0; i < width / gridSize; i++) {
    arr[i] = [];
    for (let j = 0; j < height / gridSize; j++) {
      arr[i][j] = "empty";
    }
  }

  arr[source.x][source.y] = "start";
  arr[target.x][target.y] = "end";
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

const main = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  setupGrid();

  render(ctx);

  setInterval(() => {
    render(ctx);
  }, 100);
};

window.addEventListener("load", () => {
  main();
});

document.getElementById("form").onsubmit = (e) => {
  e.preventDefault();

  const fd = new FormData(e.target);
  console.log(fd);

  const xc = Number(fd.get("xc"));
  const yc = Number(fd.get("yc"));
  const type = fd.get("type");

  console.log(xc, yc);

  arr[xc][yc] = type;
};

document.getElementById("run-button").onclick = (e) => {
  djikstras(source, target);
};
