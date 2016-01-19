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

const upperActionY = (dy, maxY) =>
  dy > maxY
    ? maxY
    : dy < 0
      ? -maxY
      : dy;

const lowerActionY = (dy, maxY, height) =>
  dy < -maxY
    ? height - maxY
    : dy > 0
      ? height + maxY
      : height + dy;

let SwipeExp = React.createClass({
  getInitialState: function() {
  	return {
    	upperActionTop: new Animated.Value(-MAX_Y),
      lowerActionTop: new Animated.Value(Window.height + MAX_Y)
    };
  },
  componentWillMount: function() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        const upperDy = upperActionY(gesture.dy, MAX_Y);
        const lowerDy = lowerActionY(gesture.dy, MAX_Y, Window.height);
        this.state.upperActionTop.setValue(upperDy);
        this.state.lowerActionTop.setValue(lowerDy);
    	},
      onPanResponderRelease: (e, gesture) => {
    	  Animated.parallel([
          Animated.timing(          // Uses easing functions
            this.state.upperActionTop,    // The value to drive
            {toValue: -MAX_Y}),
          Animated.timing(          // Uses easing functions
            this.state.lowerActionTop,    // The value to drive
            {toValue: Window.height + MAX_Y})
        ]).start();
    	}
    });
  },
  renderUpperAction: function() {
    const s = [styles.actions, {top: this.state.upperActionTop.interpolate({
      inputRange:  [-MAX_Y, 0, MAX_Y],
      outputRange: [-MAX_Y, -(MAX_Y / 2), MAX_Y],
    })}];
  	return <Animated.View style={s}>
      <Text style={styles.actionsText}>
        Upper Action
      </Text>
    </Animated.View>;
	},
  renderLowerAction: function() {
    const heightPluxMax = Window.height + MAX_Y;
    const heightLessMax = Window.height - MAX_Y;
    const s = [styles.actions, {top: this.state.lowerActionTop.interpolate({
      inputRange:  [heightLessMax, Window.height, heightPluxMax],
      outputRange: [heightLessMax, Window.height + (MAX_Y / 2), heightPluxMax],
    })}];
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
