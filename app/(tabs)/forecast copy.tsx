import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { LinearTransition, useAnimatedRef } from 'react-native-reanimated';

import { LocationAPI, WeatherAPI, DayResult } from '@/scripts/locationWeatherApiInterface';

function heuristic(rainfall_mm: number, cloud_cover_percent: number, temperature_celsius: number) {
  const rain_c = 10.0;
  const cloud_c = 10.0;
  const temp_c = 1.0;
  return rain_c * Math.pow(rainfall_mm, 2) +
    cloud_c * Math.pow(cloud_cover_percent, 3) +
    temp_c * Math.pow(temperature_celsius, 0.5);
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
          <TouchableOpacity
            key={index}
            onPress={() => {
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
              <Text style={styles.heading}>Day {index + 1}</Text>
              {index === currentIndex && (
                <View>
                  <Text style={styles.body}>
                    Moon Phase: {dayResult.moonPhaseMetric.getDisplayValue()}
                  </Text>
                  <Text style={styles.body}>
                    Suntime: {dayResult.suntimeMetric.getDisplayValue()}
                  </Text>
                  {dayResult.hourQueryResults.map((hourResult, hourIndex) => (
                    <View key={hourIndex}>
                      <Text style={styles.body}>
                        Hour {hourIndex}: Cloud Cover: {hourResult.cloudCoverMetric.getDisplayValue()}
                      </Text>
                      <Text style={styles.body}>
                        Precipitation: {hourResult.precipitationMetric.getDisplayValue()}
                      </Text>
                      <Text style={styles.body}>
                        Temperature: {hourResult.temperatureMetric.getDisplayValue()}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
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
