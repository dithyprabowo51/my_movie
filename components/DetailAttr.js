import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'

const DetailAttr = (props) => {
  return (
    <View style={{ width: '100%', marginTop: 12 }}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 18 }}>{props.attr}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 18 }}>:</Text>
          </View>
        </View>
        <View style={{ flex: 3, marginStart: 5 }}>
          <Text style={{ fontSize: 18 }}>{props.value}</Text>
        </View>
      </View>
    </View>
  )
}

export default DetailAttr