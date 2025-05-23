import React from 'react';
import { Text, ImageBackground, StyleSheet, View } from 'react-native';

export const HomeScreen = () => (
  <ImageBackground
    source={require('../../assets/background.png')}
    resizeMode="cover"
    style={styles.image}
    blurRadius={2}
  >
    {/* Black overlay */}
    <View style={styles.overlay} />

    {/* Content on top of overlay */}
    <View style={styles.container}>
      <Text style={styles.text}>Tela inicial</Text>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 0.5 = 50% black filter
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#00000080',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
