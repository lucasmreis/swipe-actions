/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

let Window = Dimensions.get('window');

const MAX_Y = 100;

const between = (x, min, max) =>
  x < min
    ? min
    : x > max
      ? max
      : x;

let SwipeExp = React.createClass({
  getInitialState: function() {
  	return {
      anim: new Animated.Value(0)
    };
  },
  componentWillMount: function() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        const dy = between(gesture.dy, -MAX_Y, MAX_Y);
        this.state.anim.setValue(dy);
    	},
      onPanResponderRelease: (e, gesture) => {
        Animated.timing(
          this.state.anim,
          {toValue: 0}
        ).start();
    	}
    });
  },
  renderUpperAction: function() {
    const s = [styles.actions, {
      top: this.state.anim.interpolate({
        inputRange:  [-MAX_Y, 0, MAX_Y],
        outputRange: [-MAX_Y, -(MAX_Y / 2), MAX_Y],
      }),
      opacity: this.state.anim.interpolate({
        inputRange:  [-MAX_Y, MAX_Y / 2, MAX_Y],
        outputRange: [0, 0, 1],
      })
    }];

  	return <Animated.View style={s}>
      <Text style={styles.actionsText}>
        Upper Action
      </Text>
    </Animated.View>;
	},
  renderLowerAction: function() {
    const heightPluxMax = Window.height + MAX_Y;
    const heightLessMax = Window.height - MAX_Y;

    const s = [styles.actions, {
      top: this.state.anim.interpolate({
        inputRange:  [-MAX_Y, 0, MAX_Y],
        outputRange: [heightLessMax, Window.height + (MAX_Y / 2), heightPluxMax]
      }),
      opacity: this.state.anim.interpolate({
        inputRange:  [-MAX_Y, -MAX_Y / 2, MAX_Y],
        outputRange: [1, 0, 0],
      })
    }];

  	return <Animated.View style={s}>
      <Text style={styles.actionsText}>
        Lower Action
      </Text>
    </Animated.View>;
  },
  render: function() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        {this.renderUpperAction()}
        <Text style={styles.contents}>
          Contents
        </Text>
				{this.renderLowerAction()}
      </View>
    );
  }
});

//
// STYLES
//

const ACTION_WIDTH = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contents: {
    fontSize: 28,
    textAlign: 'center'
  },
  actions: {
    position: 'absolute',
    width: ACTION_WIDTH,
    left: (Window.width / 2) - (ACTION_WIDTH / 2),
    top: 0
  },
  actionsText: {
    fontSize: 14,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('swipeExp', () => SwipeExp);
