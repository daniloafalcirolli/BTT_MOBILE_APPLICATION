import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView from 'react-native-maps';

function App() {
  return (
    <View
      style={{flex:1}}
    >
      <MapView
        style={{flex:1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default App;
