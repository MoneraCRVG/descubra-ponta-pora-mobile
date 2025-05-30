import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPontoTuristicoById } from '../api'; // Adjust path as needed
import { PontoTuristico } from '../datatypes'; // Adjust path as needed
import { PontoTuristicoScreenRouteProp, PontoTuristicoScreenNavigationProp } from '../navigation/navigator'; // Import types

const { width } = Dimensions.get('window');

export const PontoTuristicoScreen = () => {
  // Use the specific route prop type
  const route = useRoute<PontoTuristicoScreenRouteProp>();
  // If you need navigation actions from this screen:
  // const navigation = useNavigation<PontoTuristicoScreenNavigationProp>();

  const { pontoId } = route.params;

  const [ponto, setPonto] = useState<PontoTuristico | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPontoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPontoTuristicoById(pontoId);
        if (data) {
          setPonto(data);
        } else {
          setError('Ponto turístico não encontrado.');
        }
      } catch (err) {
        console.error("Error fetching PontoTuristico details:", err);
        setError('Falha ao carregar os detalhes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPontoDetails();
  }, [pontoId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!ponto) {
    // This case should ideally be covered by the error state if data is null after fetch
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Detalhes do ponto turístico não disponíveis.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={{ uri: ponto.imagem }} style={styles.image} onError={(e) => console.log("Failed to load image:", e.nativeEvent.error)}/>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{ponto.nome}</Text>
        <Text style={styles.description}>{ponto.descricao}</Text>
        <View style={styles.infoRow}>
          {/* <Ionicons name="location-outline" size={20} color="#555" style={styles.icon} /> */}
          <Text style={styles.addressTitle}>Endereço:</Text>
        </View>
        <Text style={styles.addressText}>{ponto.endereco}</Text>

        {/* Add more details here if available in PontoTuristico interface */}
        {/* Example:
        {ponto.horarioFuncionamento && (
          <>
            <Text style={styles.infoLabel}>Horário de Funcionamento:</Text>
            <Text style={styles.infoText}>{ponto.horarioFuncionamento}</Text>
          </>
        )}
        {ponto.telefone && (
          <>
            <Text style={styles.infoLabel}>Telefone:</Text>
            <Text style={styles.infoText}>{ponto.telefone}</Text>
          </>
        )}
        */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: width * 0.75, // Aspect ratio for the image (e.g., 4:3)
    resizeMode: 'cover',
    marginBottom: 5, // Small gap before the shadow/card starts
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 12,
    marginTop: -30, // Pulls the card up over the image slightly
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginTop: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
  },
});
