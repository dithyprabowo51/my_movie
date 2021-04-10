import axios from 'axios'

export const fetchMovies = () => async dispatch => {
  try {
    dispatch({ type: 'SET_ISLOADING', data: true })
    const { data } = await axios({
      url: 'https://api.themoviedb.org/3/discover/movie?api_key=8e35ed5cd4d6c4c5134887cc3f28fb6b',
      method: 'GET'
    })
    dispatch({ type: 'SET_MOVIES', data: data.results })
    dispatch({ type: 'SET_ISLOADING', data: false })
  } catch (err) {
    console.log(err)
  }
}