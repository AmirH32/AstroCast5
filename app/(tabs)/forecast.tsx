import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



function MyButton({ title }: { title: string }) {
    return (
      <button>{title}</button>
    );
  }
  
  export default function MyApp() {
    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton title="I'm a button" />
      </div>
    );
  }