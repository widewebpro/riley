let gridsFunc = (cols) => {
  let grids = {}

  for (let i = 1; i < cols.length; i++) {
    grids[`span-${i}`] = `span ${i} / span ${i}`
  }

  return grids;
}

module.exports = (cols) => gridsFunc(cols)
