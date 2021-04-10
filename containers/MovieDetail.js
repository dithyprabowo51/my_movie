import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, StyleSheet, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'

// Components
import DetailAttr from '../components/DetailAttr.js'

import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieDetail = (props) => {
  const [isFavorite, setIsFavorites] = useState(false)
  const getFavorites = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('movies')
        .then(data => resolve(JSON.parse(data)))
        .catch(err => {
          reject('Something wrong')
        })
    })
  }
  const checkIsFavorites = async () => {
    try {
      let favoritesMovie = await getFavorites()
      if (!favoritesMovie) return setIsFavorites(false)
      const findMovie = favoritesMovie.find(movie => movie.id === props.route.params.id)
      if (findMovie) {
        setIsFavorites(true)
      } else {
        setIsFavorites(false)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleAddToFavorites = async () => {
    try {
      let favoritesMovie = await getFavorites()
      let detailMovie = props.route.params
      if (!Array.isArray(favoritesMovie)) {
        favoritesMovie = []
      }
      await AsyncStorage.setItem('movies', JSON.stringify([...favoritesMovie, detailMovie]))
      checkIsFavorites()
      // await AsyncStorage.clear()
    } catch (e) {
      console.log(e)
    }
  }
  const handleDeleteFromFavorite = async () => {
    let favoritesMovie = await getFavorites()
    let detailMovie = props.route.params
    let updateFavorites = favoritesMovie.filter(movie => movie.id !== detailMovie.id)
    await AsyncStorage.setItem('movies', JSON.stringify(updateFavorites))
    checkIsFavorites()
  }
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      checkIsFavorites()
    }, [])
  )
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image source={{ uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.route.params.poster_path}` }} style={{ width: 160, height: 220 }} />
      </View>
      <DetailAttr
        attr='Title'
        value={props.route.params.original_title}
      />
      <DetailAttr
        attr='Release Date'
        value={props.route.params.release_date}
      />
      <DetailAttr
        attr='Score'
        value={props.route.params.vote_average}
      />
      <DetailAttr
        attr='Overview'
        value={props.route.params.overview}
      />
      <View style={styles.buttonFavorite}>
        <Icon
          raised
          name='heart'
          type='font-awesome'
          color={isFavorite ? 'red' : 'gray'}
          size={18}
          onPress={!isFavorite ? handleAddToFavorites : handleDeleteFromFavorite} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    position: 'relative'
  },
  buttonFavorite: {
    position: 'absolute',
    right: 0,
    top: 10
  }
})

export default MovieDetail