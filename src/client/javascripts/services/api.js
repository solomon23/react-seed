import 'whatwg-fetch'
import Timeout from 'await-timeout'
import { DATA } from './__mocks__/data'

const TIMEOUT = 250

export async function getData(/* params */) {
  // const brand = params.brand
  // return (await fetch(`https://fake/?brand=${brand}`)).json()

  await Timeout.set(TIMEOUT)
  return DATA
}

export async function getMoreData(/* params */) {
  // const brand = params.brand
  // return (await fetch(`https://fake/?brand=${brand}`)).json()

  await Timeout.set(TIMEOUT)
  return DATA
}
