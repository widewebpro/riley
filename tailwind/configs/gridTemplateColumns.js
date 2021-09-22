let gridsFunc = (cols) => {
  let grids = {}

  for (let i = 0; i < cols.length; i++) {
    grids[i] = `repeat(${i}, minmax(0, ${i}fr))`
  }

  return grids;
}

module.exports = (cols) => gridsFunc(cols)
