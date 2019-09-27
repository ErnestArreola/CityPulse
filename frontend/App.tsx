import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Map from "./components/GoogleMap/Map"


export default function App() {

  return (
      <Map/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
