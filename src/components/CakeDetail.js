import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CakeDetail = ({ route }) => {
  const { cakeId } = route.params;
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCake();
  }, []);

  const fetchCake = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://611a268fcbf1b30017eb5527.mockapi.io/cakes/${cakeId}`
      );
      const data = await response.json();

      if (response.ok && data.status === 'SUCCESS') {
        setCake(data.data);
      } else {
        setError(data.message);
      }

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!cake) {
    return (
      <View style={styles.container}>
        <Text>Cake not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: cake.image }} style={styles.cakeImage} />
      <Text style={styles.cakeTitle}>{cake.title}</Text>
      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={20} color="#FFB239" />
        <Text style={styles.cakeRating}>{cake.rating}/100</Text>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.cakeDescription}>{cake.description}</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFBF5',
  },
  cakeImage: {
    width: width - 32,
    height: (width - 32) * 0.75,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 30,
    marginTop: 10,
  },
  cakeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Futura',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  cakeRating: {
    fontSize: 16,
    fontFamily: 'Futura',
    marginLeft: 4,
  },
  descContainer: {
    flex: 1,
    width: width - 32,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFDDCC',
  },
  cakeDescription: {
    fontSize: 16,
    fontFamily: 'Futura',
    textAlign: 'center',
  },
});

export default CakeDetail;
