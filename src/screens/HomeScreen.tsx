import React from 'react'; // Removed useEffect, useState as data comes from context
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator, // Keep ActivityIndicator for potential future use or if context has loading state
  Platform
} from 'react-native';
// PontoTuristico type might still be useful for item type in renderItem, though filteredPontos is typed in context
// import { PontoTuristico } from '../datatypes';
import { useSearch } from '../SearchContext'; // Path to your SearchContext
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationHookProp } from '../navigation/navigator'; // Correct type for navigation

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationHookProp>();
  const { searchQuery, setSearchQuery, filteredPontos } = useSearch();

  // The SearchContext now handles fetching and loading states.
  // If SearchContext doesn't expose a loading state, and you need one here
  // (e.g., for an initial "app loading" screen before context is ready),
  // that would require modification to SearchContext or a global app state.
  // For now, we assume filteredPontos is initially empty then populates.

  const handlePressPonto = (pontoId: number) => {
    navigation.navigate('PontoTuristicoDetail', { pontoId });
  };

  // Optional: Add a loading indicator if SearchContext provides a loading state
  // const { isLoading } = useSearch(); // if you add isLoading to SearchContextType
  // if (isLoading) { ... return <ActivityIndicator ... />; }

  return (
    <ImageBackground
      source={require('../../assets/background.png')} // Ensure this path is correct
      resizeMode="cover"
      style={styles.imageBackgroundFull}
      blurRadius={3} // Slightly more blur
    >
      <View style={styles.overlay} />

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={22} color="#E0E0E0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar em Ponta Porã..."
          placeholderTextColor="#B0B0B0"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing" // iOS clear button
        />
      </View>

      {filteredPontos.length === 0 && searchQuery ? (
        <View style={styles.centeredMessageContainer}>
          <Ionicons name="sad-outline" size={60} color="rgba(255,255,255,0.7)" />
          <Text style={styles.centeredMessageText}>Nenhum resultado encontrado para "{searchQuery}".</Text>
        </View>
      ) : filteredPontos.length === 0 && !searchQuery ? (
         <View style={styles.centeredMessageContainer}>
          {/* Could be a loading indicator if SearchContext is still fetching initial data */}
          {/* Or a message if initial fetch yielded no results */}
          <Ionicons name="information-circle-outline" size={60} color="rgba(255,255,255,0.7)" />
          <Text style={styles.centeredMessageText}>Nenhum ponto turístico disponível no momento.</Text>
          <Text style={styles.centeredMessageSubText}>Tente novamente mais tarde.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPontos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressPonto(item.id)} activeOpacity={0.8}>
              <View style={styles.card}>
                <Image source={{ uri: item.imagem }} style={styles.cardImage} onError={(e) => console.log("HomeScreen card image load error:", e.nativeEvent.error)} />
                <View style={styles.cardTextOverlay}>
                  <Text style={styles.title} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.description} numberOfLines={1}>{item.endereco}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackgroundFull: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay for better text contrast
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(40, 40, 40, 0.85)', // Dark, slightly transparent
    borderRadius: 30, // Pill shape
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginTop: Platform.OS === 'ios' ? 60 : 40, // Adjust for status bar
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 17,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10, // OS-specific padding
  },
  listContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very subtle card background
    borderRadius: 16, // More rounded corners
    marginVertical: 8,
    overflow: 'hidden', // Important for borderRadius on Image
    // Adding a subtle border
    // borderColor: 'rgba(255, 255, 255, 0.2)',
    // borderWidth: 1,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: 220, // Slightly taller images
    resizeMode: 'cover',
  },
  cardTextOverlay: { // Text over image, or as a distinct block below
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent overlay for text readability
    padding: 12,
    borderBottomLeftRadius: 16, // Match card's border radius
    borderBottomRightRadius: 16,
  },
  title: {
    color: 'white',
    fontSize: 20, // Slightly smaller for overlay
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: { // Used for address in this version
    color: '#E0E0E0',
    fontSize: 14,
  },
  // address is now part of description style in cardTextOverlay
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  centeredMessageText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
  centeredMessageSubText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  }
});
