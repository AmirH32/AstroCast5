import React, {Component} from 'react';
import { Text, StyleSheet, PanResponder, Animated, Pressable} from 'react-native';


class CityTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100) {
          // Swiped right and released
          Animated.timing(this.state.pan, {
            toValue: { x: 500, y: 0 },
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            this.props.onRemove(this.props.city);
            // Sends back city so it can be used to delete city template
          });
        } else {
          // Reset the swipe state if swiped the wrong way
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }

  handlePress = () => {
    console.log("New page")
  };

  render() {
    const { city } = this.props;
    const { pan } = this.state;

    return (
      <Pressable onPress={this.handlePress}>
        <Animated.View
          style={[styles.container, { transform: pan.getTranslateTransform() }]}
          {...this.panResponder.panHandlers}
        >
          <Text style={styles.cityText}>{city}</Text>
        </Animated.View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
  },
  cityText: {
    fontSize: 34,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#08247D',
  },
});


export default CityTemplate;