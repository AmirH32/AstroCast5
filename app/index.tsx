import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ModalScreen from '@/components/Modal';
import CityTemplate from '@/components/CityTemplate';

const STORAGE_KEY = '@selected_cities';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const storedCities = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedCities !== null) {
          setSelectedCities(JSON.parse(storedCities));
        }
      } catch (error) {
        console.error('Failed to load cities from storage', error);
      }
    };

    loadCities();
  }, []);

  const saveCities = async (cities) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    } catch (error) {
      console.error('Failed to save cities to storage', error);
    }
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCitySelect = (city) => {
    const updatedCities = [...selectedCities, city];
    setSelectedCities(updatedCities);
    saveCities(updatedCities);
    setModalVisible(false);
  };

  const handleRemoveCity = (city) => {
    const updatedCities = selectedCities.filter((c) => c !== city);
    setSelectedCities(updatedCities);
    saveCities(updatedCities);
  };

  const { width } = Dimensions.get('window');
  const dynamicFontSize = width * 0.1;
  const dynamicLeft = width * 0.60;

  return (
    <View style={styles.MainContainer}>
      <ModalScreen visible={modalVisible} onClose={handleCloseModal} onCitySelect={handleCitySelect} />

      <View style={styles.Box}>
        <View style={styles.HeadingContainer}>
          <ThemedText resizeMode='contain' style={[styles.Heading, { fontSize: dynamicFontSize }]}>
            Your Locations
          </ThemedText>
        </View>
        <View style={styles.Table}>
          {selectedCities.map((city, index) => (
            <CityTemplate key={index} city={city} onRemove={handleRemoveCity} />
          ))}
        </View>

        <Pressable style={[styles.button, { left: dynamicLeft }]} onPress={handlePress}>
          <ThemedText style={styles.button_text}>+</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#221D34',
    flex: 1,
    padding: 40,
  },
  Box: {
    flex: 2,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 20,
  },
  HeadingContainer: {
    backgroundColor: '#1A5974',
    height: '20%',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white',
  },
  Table: {
    flex: 1,
    padding: 10,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    padding: 20,
    width: 60,
    height: 60,
    backgroundColor: '#1A5974',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontSize: 54,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white',
  },
});
