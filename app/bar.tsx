import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { LinearTransition, useAnimatedRef } from 'react-native-reanimated';

import { LocationAPI, WeatherAPI, DayResult } from '@/scripts/locationWeatherApiInterface';

import {heuristic, get_colour} from '@/scripts/placeSearch'

import { ProgressBar} from 'react-native-paper';

const MyComponent = () => (
  <ProgressBar progress={heuristic(rainfall, cloud_cover_percent, temperature_celsius)} 
  color={get_colour(rainfall, cloudcover_percent, temperature_celsius)} />
);

export default MyComponent;