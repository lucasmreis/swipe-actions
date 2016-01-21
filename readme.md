# SwipeActions

React Native component for firing actions based on swipe gestures:

![ScreenShot](https://raw.github.com/lucasmreis/swipe-actions/master/swipe-actions.gif)

Wrap main component in `<SwipeActions />`, pass two components and two callbacks as the upper and lower actions:

```js
const mainComponent = (<View>
  <Text>
    Child Component
  </Text>
</View>);

// components shown on swipe
const node = pos => (
  <View>
    <Text>
      {`${pos} Action`}
    </Text>
  </View>);

// callbacks fired on release
const action = pos => () =>
  Alert.alert(`${pos} Action Fired!`);

<SwipeActions
   upperAction={action('Upper')}
   lowerAction={action('Lower')}
   upperNode={node('Upper')}
   lowerNode={node('Lower')}>
  {mainComponent}
</SwipeActions>
```

Please [★ on GitHub](https://github.com/lucasmreis/swipe-actions)!
