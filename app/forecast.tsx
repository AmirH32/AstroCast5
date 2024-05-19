import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Layout, LinearTransition, useAnimatedRef } from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import { ProgressBar } from 'react-native-paper';
import { heuristic_colour_hsl, LocationAPI, WeatherAPI, DayResult } from '@/scripts/locationWeatherApiInterface';

export default function HomeScreen() {
  const route = useRoute();
  const { locationName, northing, easting } = route.params;
  const [data, setData] = useState<DayResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const ref = useAnimatedRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const weatherData = WeatherAPI.queryWeatherThroughoutWeek(northing, easting, 0);
        setData(weatherData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [northing, easting]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {data.map((dayResult, index) => (
        <Animated.View
          key={index}
          style={styles.cardContainer}
          ref={ref}
          layout={LinearTransition.duration(180)}
        >
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCurrentIndex(index);
            }}
            style={styles.card}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.heading}>
                {dayResult.dayName} (Heuristic: {Math.round(dayResult.averageHeuristic * 10)}%)
              </Text>
              {<ProgressBar
                progress={dayResult.averageHeuristic / 10}
                color={heuristic_colour_hsl(dayResult.averageHeuristic)}
              />}
            </View>


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
                  
                  <Text style={styles.text}>
                    (Demo)<br />
                    00:00 Goodness heuristic - {Math.round(dayResult.hourQueryResults[0].averageHeuristic * 10)}%<br/>
                    00:00 Cloud cover - {dayResult.hourQueryResults[0].cloudCoverMetric.getDisplayValue()}<br />
                    00:00 Precipitation - {dayResult.hourQueryResults[0].precipitationMetric.getDisplayValue()}<br />
                    00:00 Temperature - {dayResult.hourQueryResults[0].temperatureMetric.getDisplayValue()}<br />
              
                    11:00 Goodness heuristic - {Math.round(dayResult.hourQueryResults[11].averageHeuristic * 10)}%<br />
                    11:00 Cloud cover - {dayResult.hourQueryResults[11].cloudCoverMetric.getDisplayValue()}<br />
                    11:00 Precipitation - {dayResult.hourQueryResults[11].precipitationMetric.getDisplayValue()}<br />
                    11:00 Temperature - {dayResult.hourQueryResults[11].temperatureMetric.getDisplayValue()}<br />
                  </Text>
                </View>
              </Swiper>
            )}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242038',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '95%',
    alignSelf: 'center',
    flexGrow: 1,
    backgroundColor: '#104256',
    borderRadius: 10,
    marginVertical: 3
  },
  cardHeader: {
    width: '95%',
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
    //backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
