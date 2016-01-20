'use strict';
import React, {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

import { between } from '../util';

const Window = Dimensions.get('window');

const MAX_Y = Window.height / 6;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionContainer: {
    position: 'absolute',
    width: Window.width,
    left: 0,
    top: 0,
    backgroundColor: 'transparent'
  },
  actionContents: {
    alignItems: 'center'
  }
});

export default React.createClass({
  displayName: 'SwipeActions',
  propTypes: {
    children: React.PropTypes.node.isRequired,
    upperAction: React.PropTypes.func.isRequired,
    lowerAction: React.PropTypes.func.isRequired,
    upperNode: React.PropTypes.node.isRequired,
    lowerNode: React.PropTypes.node.isRequired
  },
  getInitialState() {
    return {
      anim: new Animated.Value(0)
    };
  },
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        const dy = between(gesture.dy, -MAX_Y, MAX_Y);
        this.state.anim.setValue(dy);
      },
      onPanResponderRelease: (e, gesture) => {
        const dy = between(gesture.dy, -MAX_Y, MAX_Y);
        if (dy === MAX_Y) {
          this.props.upperAction();
        } else if (dy === -MAX_Y) {
          this.props.lowerAction();
        }
        Animated.timing(
          this.state.anim,
          { toValue: 0 }
        ).start();
      }
    });
  },
  renderAction(style, node) {
    return (<Animated.View style={style}>
      <View style={styles.actionContents}>
        {node}
      </View>
    </Animated.View>);
  },
  renderUpperAction() {
    const s = [styles.actionContainer, {
      top: this.state.anim.interpolate({
        inputRange: [-MAX_Y, 0, MAX_Y],
        outputRange: [-MAX_Y, -(MAX_Y / 2), MAX_Y]
      }),
      opacity: this.state.anim.interpolate({
        inputRange: [-MAX_Y, 0, 0.8 * MAX_Y, MAX_Y],
        outputRange: [0, 0, 0.5, 1]
      })
    }];

    const n = this.props.upperNode;

    return this.renderAction(s, n);
  },
  renderLowerAction() {
    const s = [styles.actionContainer, {
      top: this.state.anim.interpolate({
        inputRange: [-MAX_Y, 0, MAX_Y],
        outputRange: [Window.height - 2 * MAX_Y, Window.height + (MAX_Y / 2), Window.height + MAX_Y]
      }),
      opacity: this.state.anim.interpolate({
        inputRange: [-MAX_Y, 0.8 * -MAX_Y, 0, MAX_Y],
        outputRange: [1, 0.5, 0, 0]
      })
    }];

    const n = this.props.lowerNode;

    return this.renderAction(s, n);
  },
  render() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        {this.props.children}
        {this.renderUpperAction()}
				{this.renderLowerAction()}
      </View>
    );
  }
});
