import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Colour Hex Codes: Purple - #56244A, Blue (Back arrows etc) #1A5974, Light Shade 1 (White) - #E8E9F3, 2?? CDE8F4

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.Container}>
      <TouchableOpacity onPress={() => navigation.navigate('forecast')} style={styles.button}>
          <Text style={styles.buttonText}>Click the back arrow to return to the weekly overview </Text>
        </TouchableOpacity>
    
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{color: "white" }}>Scoring Information</ThemedText>

      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{color:'#CDE8F4'}}>Heuristic Goodness Score</ThemedText>
        <ThemedText style={{color: '#E8E9F3'}}>Each day is marked as red, amber or green depending on how good of a day it is to stargaze. </ThemedText>
        <ThemedText style={{color: '#E8E9F3'}}>An individual score is also provided, based on a mathematical formula that takes temperature, cloud cover and rainfall into consideration.
        </ThemedText>

        <ThemedText style={{color: '#E8E9F3'}}>The exact formula, using predetermined constants as well as live information, is as follows:</ThemedText>
        <Image source={require('@/assets/images/equation.png')} resizeMode = 'contain' style={{ width: "100%", alignSelf: 'center' }} />
      </ThemedView>

    </ThemedView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#221D34',
    padding: 10
  },
  stepContainer: {
    flex:1,
    gap: 8,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#221D34'
  },
  Container: {
      flex: 1,
      gap: 8,
      marginBottom: 8,
      padding: 10,
      backgroundColor: '#221D34'
  },

  Image: {
    alignSelf: 'center',
    flex:1
},
  button: {
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});
