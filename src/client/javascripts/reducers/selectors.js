export const createErrorMessageSelector = actions => (state) => {
  const errors = actions.map(action => state.error[action])

  if (errors && errors[0]) {
    return errors[0]
  }

  return null
}

export const createLoadingSelector = actions => state =>
  actions.some(action => state.loading[action])
