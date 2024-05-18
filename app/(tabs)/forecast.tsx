import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { LinearTransition, useAnimatedRef } from 'react-native-reanimated';
import Swiper from 'react-native-swiper'
import { LocationAPI, WeatherAPI, DayResult } from '@/scripts/locationWeatherApiInterface';

import {heuristic, get_colour} from '@/scripts/placeSearch'
import { ProgressBar } from 'react-native-paper';

// import { ProgressBar} from 'react-native-paper';


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
                        {/* <ProgressBar progress={dayResult.averageHeuristic} 
                        color={get_colour(dayResult.averageRainfall, averageCloudCover, averageTemperature)} /> */}
                        {index === currentIndex && (

                          <Swiper style={styles.slideWrapper} 
                          showsButtons={true} 
                          // loop={true}
                          // autoplay={true}
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
      backgroundColor: '#104256',
      borderRadius: 10,
      marginVertical: 3
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
      height: 450
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
  