const djikstras = (source, target, diagonals) => {
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

    const maxX = width / gridSize - 1;
    const maxY = height / gridSize - 1;

    const isValid = (x, y) => {
      const val = arr[x][y];
      return val !== "wall";
    };

    if (coord.x < maxX && isValid(coord.x + 1, coord.y)) {
      res.push({ x: coord.x + 1, y: coord.y }); // Right
    }
    if (coord.y < maxY && isValid(coord.x, coord.y + 1)) {
      res.push({ x: coord.x, y: coord.y + 1 }); // Down
    }
    if (coord.x > 0 && isValid(coord.x - 1, coord.y)) {
      res.push({ x: coord.x - 1, y: coord.y }); // Left
    }
    if (coord.y > 0 && isValid(coord.x, coord.y - 1)) {
      res.push({ x: coord.x, y: coord.y - 1 }); // Up
    }

    if (diagonals) {
      if (
        coord.x < maxX &&
        coord.y < maxY &&
        isValid(coord.x + 1, coord.y + 1)
      ) {
        res.push({ x: coord.x + 1, y: coord.y + 1 }); // Down-Right
      }
      if (coord.x > 0 && coord.y < maxY && isValid(coord.x - 1, coord.y + 1)) {
        res.push({ x: coord.x - 1, y: coord.y + 1 }); // Down-Left
      }
      if (coord.x < maxX && coord.y > 0 && isValid(coord.x + 1, coord.y - 1)) {
        res.push({ x: coord.x + 1, y: coord.y - 1 }); // Up-Right
      }
      if (coord.x > 0 && coord.y > 0 && isValid(coord.x - 1, coord.y - 1)) {
        res.push({ x: coord.x - 1, y: coord.y - 1 }); // Up-Left
      }
    }

    return res;
  };

  const weight = (index) => {
    const coord = toCoord(index);

    const val = arr[coord.x][coord.y];

    return 1;
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
    if (
      e !== toIndex(source.x, source.y) &&
      e !== toIndex(target.x, target.y)
    ) {
      arr[c.x][c.y] = "searched";
    }
  });
};
