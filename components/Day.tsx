import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LayoutChangeEvent
} from "react-native";
import { DayForecastType } from "@/scripts/get-data";
import { AnimatedView } from "react-native-reanimated/lib/typescript/reanimated2/component/View";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";



export const CollapsableContainer = ({
    children, 
    expanded,
} : {
    children: React.ReactNode;
    expanded: boolean;
}) => {
    const [height, setHeight] = useState(0)

    const onLayout = (event: LayoutChangeEvent) => {
        const layoutHeight = event.nativeEvent.layout.height
    
        if (layoutHeight > 0 && layoutHeight !== height) {
            setHeight(layoutHeight)
        }
      }
    
      const animatedStyle = useAnimatedStyle(() => {
        const animatedHeight = expanded ? withTiming(height) : withTiming(0)
        return {
            height: animatedHeight,
        }
      })

    return (
        <Animated.View style={[animatedStyle, {overflow: "hidden"}]}>
        <View onLayout={onLayout} style={{position: "absolute"}}>
            {children}
        </View>
      </Animated.View>
    )
}



export const Day = ({ item }: { item: DayForecastType }) => {
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
  };



  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onItemPress}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.day}</Text>
          </View>
        </View>

      </TouchableOpacity>

      <CollapsableContainer expanded={expanded}>
        <Text style={styles.text}>{item.temperature}</Text>
      </CollapsableContainer>
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderColor: "#162450",
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#0F0849",
    shadowColor: "#162450",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
  },
  container: { 
    flexDirection: "row", 

  },
  image: { width: 50, height: 50, margin: 10, borderRadius: 5 },
  textContainer: { justifyContent: "space-around" },
  details: { margin: 10 },
  text: { 
    opacity: 0.7,
    color: '#E0E0E0' 

  },
});