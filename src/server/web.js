import express from 'express'
import nocache from 'nocache'
import path from 'path'
import fs, { readFileSync } from 'fs'
import { logger, reqLogger, errLogger } from './logging'

const routes = JSON.parse(fs.readFileSync('./routes.json'))
const PORT = process.env.PORT || 3030

logger.info(`Starting up on port ${PORT}`)
logger.info(process.env.NODE_ENV)

// load the asset lookup on startup
const assets = JSON.parse(readFileSync('./public/webpack-assets.json'))

const app = express()
const server = app.listen(PORT)

app.use(reqLogger)

app.set('view engine', 'ejs')
app.set('views', path.join('./templates'))

const fileRender = (res, locale, data) => res.render('template.ejs', { ...assets, ...data, ...locale })

const render = (req, res, code) => {
  const ress = code === 404 ? res.status(404) : res

  fileRender(ress, { configEnv: process.env.CONFIG_ENV || 'development' })
}

routes.forEach((route) => {
  app.get(route, nocache(), render)
})

app.use('/', express.static('public'))

app.get('*', nocache(), (req, res) => render(req, res, 404))

app.use(errLogger)

export default server
