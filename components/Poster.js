import React from 'react'
import { View, Image } from 'react-native'

const Poster = (props) => {
  return (
    <View style={{ marginEnd: 20 }}>
      <Image source={{ uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.url}` }} style={{ width: 110, height: 150 }} />
    </View>
  )
}

export default Poster