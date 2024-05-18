import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { generateFakeWeatherData } from "@/scripts/get-data";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { LinearTransition, useAnimatedRef } from 'react-native-reanimated';

function heuristic (rainfall_mm: number, cloud_cover_percent: number, temperature_celsius: number) {
    const rain_c = 10.0;
    const cloud_c = 10.0;
    const temp_c = 1.0;
    return rain_c * Math.pow(rainfall_mm, 2) +
    cloud_c * Math.pow(cloud_cover_percent, 3) +
    temp_c * Math.pow(temperature_celsius, 0.5)
}


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
                    activeOpacity={0.8}
                >
                    <Animated.View 
                    style={styles.card}
                    ref={ref}
                    layout={LinearTransition.duration(180)}
                    >
                        <Text style={styles.heading}>{day}</Text>
                        {index === currentIndex && (
                        <View>
                            <Text style={styles.body}>{temperature}</Text>
                        </View> 
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
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    cardContainer: {
      flexGrow: 1,
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
  });
  
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#0D0221",
//     },
//     dayContainer: {
//         flexGrow: 1,
//         borderWidth: 2,
//         borderRadius: 10,
//         padding: 5,
//         backgroundColor: "#0F0849",
//     },
//     day: {
//         flexGrow: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     heading: {
//         fontSize: 38,
//         fontWeight: 700,
//         textTransform: 'uppercase',
//         letterSpacing: -2,
//         opacity: 0.9,
//         color: '#E0E0E0', 
//     },
//     data: {
//         color: '#E0E0E0',
//         fontSize: 20,
//         lineHeight: 20*1.5,
//         textAlign: 'center'
//     }
//   });