import Swiper from 'react-native-swiper'
 
import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  // Creating an array of numbers from 0 to 5
  const data: number[] = [...new Array(6).keys()];

  // Array of colors to be used for the background of each item
  const colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];

  // Function to render each item in the carousel
  const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })
  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0D0221",
    },
  });