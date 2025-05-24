// App.tsx
import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/navigation/navigator';


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
