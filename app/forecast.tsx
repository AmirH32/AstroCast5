import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
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
        const weatherData = await WeatherAPI.queryWeatherThroughoutWeek(northing, easting, 0);
        setData(weatherData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [northing, easting]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={styles.container}>
        {data.map((dayResult, index) => (
          <Animated.View
            key={index}
            style={styles.cardContainer}
            ref={ref}
            layout={LinearTransition.duration(180)}
          >
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentIndex(index)}
              style={styles.card}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.heading}>
                  {dayResult.dayName}
                </Text>
                <ProgressBar
                  progress={dayResult.averageHeuristic / 10}
                  color={heuristic_colour_hsl(dayResult.averageHeuristic)}
                />
              </View>

              {index === currentIndex && (
                <View style={{ flexShrink: 1, width: '100%' }}>
                  <Swiper
                    style={styles.slideWrapper}
                    showsButtons={true}
                    loop={false}
                    showsPagination={true}
                    horizontal={true}
                  >
                    <View style={styles.slide1}>
                      <View style={styles.suntimes}>
                        <Text style={styles.text1}>Sunrise: {dayResult.suntimeMetric.getDisplayValue().split("-")[0]}</Text>
                        <Text style={styles.text1}>Sunset: {dayResult.suntimeMetric.getDisplayValue().split("-")[1]}</Text>
                      </View>
                    </View>

                    <View style={styles.slide2}>
                      <View style={styles.headerRow}>
                        <Text style={styles.headerText}>Hour</Text>
                        <Text style={styles.headerText}>Temperature</Text>
                        <Text style={styles.headerText}>Cloud Cover</Text>
                        <Text style={styles.headerText}>Rainfall</Text>
                      </View>
                      <View style={styles.separator} />
                      {dayResult.hourQueryResults.map((hourResult, index) => (
                        <View style={styles.row} key={index}>
                          <Text style={styles.cell}>{index}</Text>
                          <Text style={styles.cell}>{hourResult.temperatureMetric.getDisplayValue()}</Text>
                          <Text style={styles.cell}>{hourResult.cloudCoverMetric.getDisplayValue()}</Text>
                          <Text style={styles.cell}>{hourResult.precipitationMetric.getDisplayValue()}</Text>
                        </View>
                      ))}
                    </View>
                  </Swiper>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221D34',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '95%',
    alignSelf: 'center',
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#492E60',
    borderRadius: 10,
    marginVertical: 5,
  },
  cardHeader: {
    width: '95%',
    borderRadius: 10,
    marginVertical: 10,
    paddingBottom: 25,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingBottom: 2,
    color: '#F5F1ED',
  },
  slideWrapper: {
    flexShrink: 1,
  },
  slide2: {
    flexShrink: 1,
    backgroundColor: '#492E60',
    padding: 10
  },
  slide1: {
    flexShrink: 1,
    justifyContent: 'center',
    backgroundColor: '#492E60',
    padding: 10,
    marginLeft: '2.5%',
  },
  suntimes: {
    flexDirection: 'row',
  },
  text1: {
    color: '#F5F1ED',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#3E2054',
    paddingVertical: 5,
    marginBottom: 5,
  },
  headerText: {
    color: '#F5F1ED',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    color: '#F5F1ED',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
});
