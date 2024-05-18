import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import {WeatherAPI, LocationAPI} from '@/scripts/locationWeatherApiInterface'
import { generateFakeWeatherData } from "@/scripts/get-data";
import { TouchableOpacity, enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import Animated, { LinearTransition, useAnimatedRef } from 'react-native-reanimated';
import Swiper from 'react-native-swiper'

function heuristic (rainfall_mm: number, cloud_cover_percent: number, temperature_celsius: number) {
  const rain_c = 10.0;
  const cloud_c = 10.0;
  const temp_c = 1.0;
  return rain_c * Math.pow(rainfall_mm, 2) +
  cloud_c * Math.pow(cloud_cover_percent, 3) +
  temp_c * Math.pow(temperature_celsius, 0.5)

export default function HomeScreen() {
    const data = generateFakeWeatherData();
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const ref = useAnimatedRef();


    return (
    <View style={styles.container}>
        <StatusBar hidden />
            {data.map(({ day, temperature }, index) => {
                return (
                <TouchableOpacity 
                    key={day} 
                    onPress ={() => {
                        setCurrentIndex(index === currentIndex ? null : index);

                    }} 
                    style={styles.cardContainer}
                    activeOpacity={0.5}

                >
                    <Animated.View 
                    style={styles.card}
                    ref={ref}
                    layout={LinearTransition.duration(180)}
                    >
                        <Text style={styles.heading}>{day}</Text>
                        {index === currentIndex && (

                          <Swiper style={styles.wrapper} showsButtons={true} >
                            <View style={styles.slide}>
                              <Text style={styles.text}>Hello Swiper</Text>
                            </View>
                            <View style={styles.slide}>
                              <Text style={styles.text}>Beautiful</Text>
                            </View>
                            <View style={styles.slide}>
                              <Text style={styles.text}>And simple</Text>
                            </View>
                          </Swiper>

                    )}
                    </Animated.View> 
                </TouchableOpacity>
                );
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#242038',
      justifyContent: 'center',
    },
    cardContainer: {
      flexGrow: 1,
      // padding: 20,
      backgroundColor: '#104256',
    },
    card: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontSize: 38,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: -2,
    },
    body: {
      fontSize: 20,
      lineHeight: 20 * 1.5,
      textAlign: 'center',
    },
    wrapper: {
      height: 200,
      width: 400
    },
    slide: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  });
  