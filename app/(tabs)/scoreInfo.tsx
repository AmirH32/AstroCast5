import { Image, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

//Colour Hex Codes: Purple - #56244A, Blue (Back arrows etc) #1A5974, Light Shade 1 (White) - #E8E9F3, 2?? CDE8F4

export default function HomeScreen() {
  return (
    <ThemedView style={styles.Container}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{color: '#CDE8F4'}}>Scoring Information</ThemedText>

      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{color: 'white'}}>Heuristic Goodness Score</ThemedText>
        <ThemedText style={{color: '#E8E9F3'}}>Each day is marked as red, amber or green depending on how good of a day it is to stargaze.
          The individual score is based on a mathematical formula that takes temperature, cloud cover and rainfall into consideration.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText style={{color: '#E8E9F3'}}>The exact formula used is: </ThemedText>
        <Image source={require('@/assets/images/equation4.png')} style={{ alignSelf: 'center' }} />
        <Image source={require('@/assets/images/equation5.png')} style={{ alignSelf: 'center' }} />
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#56244A',
    padding: 10
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#56244A'
  },
  Container: {
      gap: 8,
      marginBottom: 8,
      padding: 10,
      backgroundColor: '#56244A'

  },

  image: {
    width: '60%',
    height: 'auto',
    resizeMode: 'contain'
  }

});
