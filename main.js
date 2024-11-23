let arr = [];

let base = 2;
let cells = Math.pow(base, 2);

let diagonals = false;

const width = 700;
const height = 700;

let gridSize = width / Math.sqrt(cells);

let source = { x: 0, y: 0 };
let target = { x: 1, y: 1 };

let coords = { x: 0, y: 0 };

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

const renderClear = (ctx, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  ctx.fillStyle = "rgba(200 200 200)";
  ctx.fillRect(coords.x * gridSize, coords.y * gridSize, gridSize, gridSize);
};

const reset = () => {
  for (let i = 0; i < width / gridSize; i++) {
    for (let j = 0; j < height / gridSize; j++) {
      if (arr[i][j] === "searched") {
        arr[i][j] = "empty";
      }
    }
  }
};

const main = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  setupGrid();

  render(ctx);

  setInterval(() => {
    renderClear(ctx, canvas);
    render(ctx);
  }, 100);
};

window.addEventListener("load", () => {
  resizeCanvas();
  main();
});

document.getElementById("canvas").addEventListener("click", (e) => {
  const coords = {
    x: Math.floor(e.offsetX / gridSize),
    y: Math.floor(e.offsetY / gridSize),
  };

  const fd = new FormData(document.getElementById("liveedit-form"));

  const type = fd.get("c");

  arr[coords.x][coords.y] = type;
  if (type === "start") {
    arr[source.x][source.y] = "empty";
    source = coords;
  } else if (type === "end") {
    arr[target.x][target.y] = "empty";
    target = coords;
  }
});

const updateBase = (nBase) => {
  base = nBase;
  cells = Math.pow(base, 2);
  gridSize = width / Math.sqrt(cells);
  setupGrid();
};

document.getElementById("gridparams-form").onchange = (e) => {
  const fd = new FormData(document.getElementById("gridparams-form"));

  updateBase(Number(fd.get("cells")));
  diagonals = fd.get("diagonal") === "on" ? true : false;
};

document.getElementById("canvas").addEventListener("mousemove", (e) => {
  coords = {
    x: Math.floor(e.offsetX / gridSize),
    y: Math.floor(e.offsetY / gridSize),
  };
});

document.getElementById("run-button").onclick = (e) => {
  reset();
  djikstras(source, target, diagonals);
};

document.getElementById("reset-button").onclick = (e) => {
  reset();
};

window.addEventListener("resize", (e) => {
  resizeCanvas();
});

const resizeCanvas = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
};
