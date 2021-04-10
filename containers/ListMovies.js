import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native'

// Components
import Tab from '../components/Tab.js'
import CardMovie from '../components/CardMovie.js'
import NotFound from '../components/NotFound.js'

// actions
import { fetchMovies } from '../redux/actions/fetchMovies.js'

// redux
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

const ListMovies = (props) => {
  const [tab, setTab] = useState('movies')
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)
  const isLoading = useSelector(state => state.isLoading)
  const handleNavigate = value => {
    props.navigation.navigate('MovieDetail', value)
  }
  const getFavoritesMovie = async () => {
    try {
      dispatch({ type: 'SET_ISLOADING', data: true })
      let favorites = await AsyncStorage.getItem('movies')
      favorites = JSON.parse(favorites)
      if (!Array.isArray(favorites)) {
        dispatch({ type: 'SET_MOVIES', data: [] })
      } else {
        dispatch({ type: 'SET_MOVIES', data: favorites })
      }
      dispatch({ type: 'SET_ISLOADING', data: false })
    } catch (err) {
      console.log(err)
    }
  }
  useFocusEffect(
    useCallback(() => {
      if (tab === 'movies') {
        dispatch(fetchMovies())
      } else {
        getFavoritesMovie()
      }
    }, [tab])
  )
  return (
    <View>
      <Tab tab={tab} setTab={setTab} />
      {
        isLoading ?
          <View style={{ height: '80%', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
          :
          <View style={{ height: '90%' }}>
            {
              movies.length > 0 ?
                <FlatList
                  data={movies}
                  renderItem={item =>
                    <View style={styles.listContainer}>
                      <CardMovie
                        movie={item.item}
                        handleNavigate={(value) => handleNavigate(value)}
                        tab={tab}
                      />
                    </View>
                  }
                  keyExtractor={item => String(item.id)}
                />
                :
                <NotFound />
            }
          </View>

      }
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    alignItems: 'center'
  }
})

export default ListMovies