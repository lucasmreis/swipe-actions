'use strict';
import React, {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

import { between } from './util';

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
    upperAction: React.PropTypes.func,
    lowerAction: React.PropTypes.func,
    upperNode: React.PropTypes.node,
    lowerNode: React.PropTypes.node
  },
  getInitialState() {
    return {
      anim: new Animated.Value(0)
    };
  },
  componentWillMount() {
    const upperAction = this.props.upperAction
      ? this.props.upperAction
      : () => {};

    const lowerAction = this.props.lowerAction
      ? this.props.lowerAction
      : () => {};

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        const dy = between(gesture.dy, -MAX_Y, MAX_Y);
        this.state.anim.setValue(dy);
      },
      onPanResponderRelease: (e, gesture) => {
        const dy = between(gesture.dy, -MAX_Y, MAX_Y);

        if (dy === MAX_Y) {
          upperAction();
        } else if (dy === -MAX_Y) {
          lowerAction();
        }

        Animated.timing(
          this.state.anim,
          { toValue: 0 }
        ).start();
      }
    });
  },
  renderAction({ node, topInterpolation, opacityInterpolation }) {
    if (node) {
      const s = [styles.actionContainer, {
        top: this.state.anim.interpolate(topInterpolation),
        opacity: this.state.anim.interpolate(opacityInterpolation)
      }];

      return (<Animated.View style={s}>
        <View style={styles.actionContents}>
          {node}
        </View>
      </Animated.View>);
    }
    return null;
  },
  renderUpperAction() {
    return this.renderAction({
      node: this.props.upperNode,
      topInterpolation: {
        inputRange: [-MAX_Y, 0, MAX_Y],
        outputRange: [-2 * MAX_Y, -2 * MAX_Y, 0]
      },
      opacityInterpolation: {
        inputRange: [-MAX_Y, 0, 0.8 * MAX_Y, MAX_Y],
        outputRange: [0, 0, 0.5, 1]
      }
    });
  },
  renderLowerAction() {
    return this.renderAction({
      node: this.props.lowerNode,
      topInterpolation: {
        inputRange: [-MAX_Y, 0, MAX_Y],
        outputRange: [Window.height - 2 * MAX_Y, Window.height, Window.height + MAX_Y] //  + (MAX_Y / 2)
      },
      opacityInterpolation: {
        inputRange: [-MAX_Y, 0.8 * -MAX_Y, 0, MAX_Y],
        outputRange: [1, 0.5, 0, 0]
      }
    });
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
