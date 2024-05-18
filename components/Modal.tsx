import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TextInput} from 'react-native';
import SearchBar from '@/components/SearchBar';


const ModalScreen = ({ visible, onClose, onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  }

  const returnSelectedCity = () => {
    onCitySelect(selectedCity);
  }

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
          {selectedCity && <Text style={styles.selectedCity}>Selected City: {selectedCity}</Text>}

          <View style={styles.buttonContainer}>
            <Pressable style={styles.selectButton} onPress={returnSelectedCity}>
              <Text style={styles.closeButtonText}>Select</Text>
            </Pressable>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height: '80%',
    width: '80%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectButton:{
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginRight: '40%',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedCity: {
    marginBottom: 10,
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: '100%',
    flexDirection:'row',
  }
});

export default ModalScreen;