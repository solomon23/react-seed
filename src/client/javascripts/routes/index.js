import Landing from './landing'

export const routesHash = {
  Landing,
}

export const routesArray = Object.keys(routesHash).reduce((p, c) => {
  p = [...p, ...routesHash[c]]
  return p
}, [])

export const routes = Object.keys(routesHash).reduce((p, c) => {
  const pageLookup = routesHash[c].reduce((pp, cc) => {
    if (cc.name) {
      pp[cc.name] = cc.path[0] === '/' ? cc.path : `/${cc.path}`
    }

    return pp
  }, {})

  p[c.toUpperCase()] = pageLookup
  return p
}, {})

export const buildRoute = (route, tokens) => {
  Object.keys(tokens).forEach((token) => {
    route = route.replace(`:${token}`, tokens[token])
  })

  if (tokens && tokens.query) {
    const query = Object.keys(tokens.query).map(k => `${k}=${tokens.query[k]}`).join('&')
    if (query.length > 0) {
      route += `?${query}`
    }
  }

  return route
}

export default routes
