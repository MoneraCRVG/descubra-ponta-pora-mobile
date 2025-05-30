// App.tsx
import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/navigation/navigator';
import { SearchProvider } from './src/SearchContext';


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchProvider>
        <Navigator />
      </SearchProvider>
    </GestureHandlerRootView>
  );
};

export default App;
