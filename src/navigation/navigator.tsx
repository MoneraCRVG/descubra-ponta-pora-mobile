import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native'; // Import RouteProp
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import NativeStackNavigationProp
import { Ionicons } from '@expo/vector-icons'; // Ensure Ionicons is imported

import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PontoTuristicoScreen } from '../screens/PontoTuristicoScreen'; // Import the new screen
import { SearchProvider } from '../SearchContext'; // Adjust path as needed
// PontoTuristico type might not be needed here directly, but good for reference
// import { PontoTuristico } from '../datatypes';

// Define ParamList types for type safety and IntelliSense
// This describes the routes and parameters for the Home Stack
export type HomeStackParamList = {
  HomeList: undefined; // HomeScreen (list view) doesn't receive explicit params here
  PontoTuristicoDetail: { pontoId: number }; // PontoTuristicoScreen receives pontoId
};

// This describes the routes for the Bottom Tab Navigator
export type RootTabParamList = {
  HomeStack: HomeStackParamList; // The "Home" tab will contain the HomeStack
  Perfil: undefined;
};

// Type for HomeScreen's navigation prop when using useNavigation hook
export type HomeScreenNavigationHookProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

// Type for PontoTuristicoScreen's route prop
export type PontoTuristicoScreenRouteProp = RouteProp<HomeStackParamList, 'PontoTuristicoDetail'>;
// Type for PontoTuristicoScreen's navigation prop (if needed for further navigation from detail screen)
export type PontoTuristicoScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'PontoTuristicoDetail'>;


const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>(); // Renamed to Stack for clarity

// Stack Navigator for the Home flow (HomeScreen list and PontoTuristicoScreen detail)
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      // screenOptions={{ // You can define global screen options for this stack here
      //   headerStyle: { backgroundColor: 'tomato' },
      //   headerTintColor: '#fff',
      // }}
    >
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ headerShown: false }} // Keep HomeScreen headerless as per original design
      />
      <Stack.Screen
        name="PontoTuristicoDetail"
        component={PontoTuristicoScreen}
        options={({ route }) => ({
          title: 'Detalhes', // Default title, can be dynamic: route.params.pontoName
          headerBackTitleVisible: false, // Optional: Hides the back button text (iOS)
          // headerTintColor: '#fff', // Example: if you have a colored header
          // headerStyle: { backgroundColor: '#007AFF' }, // Example
        })}
      />
    </Stack.Navigator>
  );
}

const Navigator = () => {
  return (
    <SearchProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap; // Use keyof for type safety

              if (route.name === 'HomeStack') { // Changed from 'Home' to 'HomeStack'
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Perfil') {
                iconName = focused ? 'person' : 'person-outline';
              } else {
                iconName = focused ? 'ellipse' : 'ellipse-outline'; // Default icons
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false, // Hide headers for Tab screens, Stack will manage its own
          })}
        >
          {/* The "Home" tab now renders the HomeStackNavigator */}
          <Tab.Screen
            name="HomeStack" // Name of the route for the tab
            component={HomeStackNavigator}
            options={{
              title: 'Início', // Label for the tab
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={LoginScreen} // Assuming LoginScreen is your profile screen for now
            options={{
              title: 'Perfil', // Label for the tab
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SearchProvider>
  );
};

export default Navigator;
