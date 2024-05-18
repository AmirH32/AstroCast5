import { HelloWave } from '@/components/HelloWave';
import React, {useState} from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ModalScreen from '@/components/Modal'; 
import CityTemplate from '@/components/CityTemplate'

export default function HomeScreen() {
  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);


  const handleCitySelect = (city) => {
    setSelectedCities((prevSelectedCities) => [...prevSelectedCities, city]);
    setModalVisible(false); 
  };

  const handleRemoveCity = (city) => {
    setSelectedCities((prevSelectedCities) =>
      prevSelectedCities.filter((c) => c !== city)
    );
  };

  const { width } = Dimensions.get('window');
  const dynamicFontSize = width * 0.1;
  const dynamicLeft = width*0.60;

  return (
  <View style={styles.MainContainer}>
     <ModalScreen visible={modalVisible} onClose={handleCloseModal} onCitySelect={handleCitySelect}/>

     
    <View style={styles.Box}>
      <View style={styles.HeadingContainer}>
        <ThemedText style={[styles.Heading, {fontSize: dynamicFontSize}]}>
          Your Locations
        </ThemedText>
      </View>
      <View style={styles.Table}>
          {selectedCities.map((city, index) => (
            <CityTemplate key={index} city={city} onRemove={handleRemoveCity}/>
          ))}
      </View>


      <Pressable style={[styles.button, {left:dynamicLeft}]} onPress={handlePress}>
        <ThemedText style={styles.button_text}>+</ThemedText>
      </Pressable>


    </View>
  </View>
);  
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'purple',
    flex:1,
    padding: 40
  },
  Box:{
    flex: 2,
    borderWidth:5,
    borderColor: 'black',
    borderRadius: 20,
    },
  HeadingContainer:{
    backgroundColor: '#08247D',
    height:'20%',
    width:'100%',
    borderTopRightRadius:20,
    borderTopLeftRadius:20, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  Heading:{
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white',
  },
  Table:{
    flex:1
  },
  button: {
    position: 'absolute',
    bottom: 20,
    padding: 20,
    width: 60,
    height:60,
    backgroundColor: '#08247D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontSize: 54,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white'
  }
  });