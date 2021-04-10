import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

import { Icon } from 'react-native-elements'

// Components
import Poster from './Poster.js'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useSelector, useDispatch } from 'react-redux'

const CardMovie = (props) => {
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)
  const handleNavigate = () => {
    props.handleNavigate(props.movie)
  }
  const handleDeleteFavorite = async () => {
    try {
      const moviesCopy = JSON.parse(JSON.stringify(movies))
      const moviesFilter = moviesCopy.filter(movie => {
        return movie.id !== props.movie.id
      })
      await AsyncStorage.setItem('movies', JSON.stringify(moviesFilter))
      dispatch({ type: 'SET_MOVIES', data: moviesFilter })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <Poster url={props.movie.poster_path} />
      <View style={{
        alignSelf: 'flex-start',
        width: '58%',
        height: '100%',
        position: 'relative'
      }}
      >
        <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>{props.movie.title}</Text>
        <Text>{props.movie.release_date}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0
          }}>
          <View>
            <Button onPress={handleNavigate} title="Detail" color="blue" />
          </View>
          {
            props.tab === 'favorites' ?
              <View>
                <Icon
                  raised
                  name='trash'
                  type='font-awesome-5'
                  color='gray'
                  size={20}
                  onPress={handleDeleteFavorite}
                />
              </View>
              :
              null
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 180,
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default CardMovie