import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const Tab = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={props.tab === 'movies' ? [styles.tab, styles.activeTab] : styles.tab}
        onPress={() => props.setTab('movies')}
      >
        <Text
          style={props.tab === 'movies' ? styles.textActive : styles.text}
        >
          Movies
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={props.tab === 'favorites' ? [styles.tab, styles.activeTab] : styles.tab}
        onPress={() => props.setTab('favorites')}
      >
        <Text
          style={props.tab === 'favorites' ? styles.textActive : styles.text}
        >
          Favorites
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  tab: {
    width: '45%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    borderBottomWidth: 2
  },
  text: {
    fontSize: 14
  },
  textActive: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default Tab