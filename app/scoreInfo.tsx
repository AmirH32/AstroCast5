import { Image, StyleSheet } from 'react-native';
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
          An individual score is also provided, based on a mathematical formula that takes temperature, cloud cover and rainfall into consideration.
        </ThemedText>

        <ThemedText style={{color: '#E8E9F3'}}>The exact formula used is as follows: </ThemedText>
        <Image source={require('@/assets/images/equation1.png')} resizeMode = 'contain' style={{ width: "100%", alignSelf: 'center' }} />
        <Image source={require('@/assets/images/equation2.png')} resizeMode = 'contain' style={{ width: "75%", alignSelf: 'center' }} />
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
    flex:1,
    gap: 8,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#56244A'
  },
  Container: {
      flex: 1,
      gap: 8,
      marginBottom: 8,
      padding: 10,
      backgroundColor: '#56244A'
  },

  Image: {
    alignSelf: 'center',
    flex:1
}

});
