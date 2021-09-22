let gridsFunc = (cols) => {
  let grids = {}

  for (let i = 1; i < cols.length; i++) {
    grids[`${i}`] = `${i}`
  }

  return grids;
}

module.exports = (cols) => gridsFunc(cols)
