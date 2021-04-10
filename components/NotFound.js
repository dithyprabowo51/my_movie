import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Data Not Found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
})

export default NotFound