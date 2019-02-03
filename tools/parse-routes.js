/*
  Reads through the all the subdirectories under routes and parses out the paths in
  the index.js files and writes it to a 'routes.json' file in public assets.

  This let's the server know all the routes the react app supports.  If we move to a universal app
  hosting on  node this can be pulled out.
*/

const { lstatSync, readdirSync, existsSync, readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)

function parsePathFromFile(file) {
  if (!existsSync(file)) { return [] }

  const data = readFileSync(file, 'utf8')

  const paths = []
  const regex = /path: '(.*)',/g
  let match = regex.exec(data)
  while (match != null) {
    if (match.length >= 2) {
      const item = match[1][0] === '/' ? match[1] : `/${match[1]}`
      paths.push(item)
    }

    match = regex.exec(data)
  }

  return paths
}

const parseRoutePaths = (root, output) => {
  let routes = []

  if (existsSync(root)) {
    const dirs = getDirectories(root)
    dirs.forEach((dir) => {
      routes = routes.concat(parsePathFromFile(join(dir, 'index.js')))
    })
  }

  writeFileSync(output, JSON.stringify(routes, null, '\t'))
}

class ParseRoutesPlugin {
  constructor({ src, output }) {
    this.src = src
    this.output = output
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      parseRoutePaths(this.src, this.output)
    })
  }
}

module.exports = ParseRoutesPlugin

