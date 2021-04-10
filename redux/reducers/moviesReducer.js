const initialState = {
  movies: [],
  isLoading: false
}

export const moviesReducer = (state = initialState, action) => {
  if (action.type === 'SET_MOVIES') {
    return {
      ...state,
      movies: action.data
    }
  }
  if (action.type === 'SET_ISLOADING') {
    return {
      ...state,
      isLoading: action.data
    }
  }
  return state
}