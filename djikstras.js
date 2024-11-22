const djikstras = (source, target) => {
  console.log("Running Djikstra's algorithm.");

  let dist = [];
  let prev = [];

  const Q = new Set();

  const toIndex = (x, y) => {
    return x * (width / gridSize) + y;
  };

  const toCoord = (index) => {
    return {
      x: Math.floor(index / (width / gridSize)),
      y: index % (width / gridSize),
    };
  };

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
      return Number.MAX_SAFE_INTEGER;
    } else if (val === "empty") {
      return 0;
    } else {
      return 0;
    }
  };

  for (let i = 0; i < width / gridSize; i++) {
    for (let j = 0; j < height / gridSize; j++) {
      dist[toIndex(i, j)] = Number.MAX_SAFE_INTEGER;
      prev[toIndex(i, j)] = undefined;
      Q.add(toIndex(i, j));
    }
  }

  dist[toIndex(source.x, source.y)] = 0;

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

  const S = [];
  let u = toIndex(target.x, target.y);

  if (prev[u] || u == toIndex(source.x, source.y)) {
    while (u !== undefined) {
      S.push(u);
      u = prev[u];
    }
  }

  S.forEach((e) => {
    const c = toCoord(e);
    arr[c.x][c.y] = "searched";
  });
};