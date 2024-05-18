import { View,Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  return (
  <View style={styles.MainContainer}>
    <View style={styles.Box}>
      <View style={styles.HeadingContainer}>
        <ThemedText style={styles.Heading}>
          Your locations
        </ThemedText>
      </View>
      <View style={styles.Table}>

      </View>
      
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#56244A',
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
    backgroundColor: '#1A5974',
    height:'20%',
    width:'100%',
    borderTopRightRadius:20,
    borderTopLeftRadius:20, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  Heading:{
    textAlign: 'center',
    fontSize: 54,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#E8E9F3'
  },
  Table:{
    flex:1
  }
  });
