import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { defaultLocation, WeatherAPI, DayResult } from '@/scripts/locationWeatherApiInterface';

const ModalScreen = ({ visible, onClose, onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState(defaultLocation);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  const returnSelectedCity = () => {
    if (selectedCity) {
      onCitySelect(selectedCity);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <SearchBar onCitySelect={handleSelectCity} />
          {selectedCity && <Text style={styles.selectedCity}>Selected City:<br/><br/>{selectedCity.name}</Text>}

          <View style={styles.buttonContainer}>
            <Pressable style={styles.selectButton} onPress={returnSelectedCity}>
              <Text style={styles.buttonText}>Select</Text>
            </Pressable>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#836b8c',
    padding: 20,
    borderRadius: 10,
    height: '80%',
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  selectButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedCity: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
});

export default ModalScreen;
