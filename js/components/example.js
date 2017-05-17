'use strict';
import React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet
} from 'react-native';

import SwipeActions from '../swipe-actions';

const styles = StyleSheet.create({
  actionsText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  actionsView: {
    backgroundColor: '#0077B2',
    width: 100,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 30,
    // android
    elevation: 10,
    // ios
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  exampleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  exampleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8D00'
  }
});

const action = pos => () =>
  Alert.alert(`${pos} Action Fired!`);

const node = pos => (
  <View style={styles.actionsView}>
    <Text style={styles.actionsText}>
      {`${pos} Action`}
    </Text>
  </View>);

export default React.createClass({
  displayName: 'RootComponent',
  render() {
    return (
      <SwipeActions
         upperAction={action('Upper')}
         lowerAction={action('Lower')}
         upperNode={node('Upper')}
         lowerNode={node('Lower')}>
        <View style={styles.exampleView}>
          <Text style={styles.exampleText}>
            Child Component
          </Text>
        </View>
      </SwipeActions>);
  }
});
