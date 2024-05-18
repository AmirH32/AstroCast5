import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { LinearTransition, useAnimatedRef } from 'react-native-reanimated';
import Swiper from 'react-native-swiper'
import { LocationAPI, WeatherAPI, DayResult } from '@/scripts/locationWeatherApiInterface';


function heuristic (rainfall_mm: number, cloud_cover_percent: number, temperature_celsius: number) {
    const rain_c = 10.0;
    const cloud_c = 10.0;
    const temp_c = 1.0;
    return rain_c * Math.pow(rainfall_mm, 2) +
    cloud_c * Math.pow(cloud_cover_percent, 3) +
    temp_c * Math.pow(temperature_celsius, 0.5)
}


export default function HomeScreen() {
    const [data, setData] = useState<DayResult[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const ref = useAnimatedRef();


    useEffect(() => {
      async function fetchData() {
        try {
          const locations = await LocationAPI.queryLocation("Cambridge");
          const location = locations[0];
          const weatherData = WeatherAPI.queryWeatherThroughoutWeek(location, 0);
          setData(weatherData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }, []);


    return (
    <View style={styles.container}>
        <StatusBar hidden />
            {data.map((dayResult, index) => {
                return (
                <View style={styles.cardContainer}>
                <Animated.View 
                  style={styles.cardContainer}
                  ref={ref}
                  layout={LinearTransition.duration(180)}
                  >
                <TouchableOpacity 
                    key={index} 
                    onPress ={() => {
                        setCurrentIndex(index === currentIndex ? null : index);
                    }} 
                    style={styles.card}
                    activeOpacity={0.8}
                >
                    
                        <Text style={styles.heading}>{dayResult.dayName}</Text>
                        <View></View>
                        {index === currentIndex && (

                          <Swiper style={styles.slideWrapper} 
                          showsButtons={true} 
                          loop={false}
                          >
                            <View style={styles.slide}>
                              <Text style={styles.text}>abcdefg</Text>
                            </View>
                            <View style={styles.slide}>
                              <Text style={styles.text}>hijklmnop</Text>
                            </View>
                          </Swiper>

                    )}
                </TouchableOpacity>
                </Animated.View> 

                </View>
                );
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    cardContainer: {
      flexGrow: 1,
      backgroundColor: '#104256',
    },
    card: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontSize: 38,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: -2,
    },
    body: {
      fontSize: 20,
      textAlign: 'center',
    },
    slideWrapper: {
      height: 400,
      width: '100%'
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
  