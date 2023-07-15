import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CakeList = () => {
  const [loading, setLoading] = useState(true);
  const [cakes, setCakes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    fetchCakes();
  }, [currentPage]);

  useEffect(() => {
    if (route.params?.newCake) {
      const { newCake } = route.params;
      setCakes((prevCakes) => [...prevCakes, newCake]);
    }
  }, [route.params?.newCake]);

  const fetchCakes = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://611a268fcbf1b30017eb5527.mockapi.io/cakes?page=${currentPage}`
      );
      const data = await response.json();

      if (response.ok) {
        setCakes(data.data.items);
        setTotalPages(data.data.total_page);
      } else {
        setError(data.message);
      }

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleAddCake = () => {
    navigation.navigate('AddCake');
  };

  const handleDeleteCake = (cakeId) => {
    Alert.alert('Confirmation', 'Are you sure you want to delete this cake?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteCake(cakeId);
        },
      },
    ]);
  };

  const deleteCake = async (cakeId) => {
    try {
      const response = await fetch(
        `https://611a268fcbf1b30017eb5527.mockapi.io/cakes/${cakeId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        fetchCakes();
      } else {
        setError('Failed to delete cake');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNavigateToPage = (page) => {
    setCurrentPage(page);
  };

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#D35656" size="large" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cakes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cakeItem}
                onPress={() =>
                  navigation.navigate('CakeDetail', { cakeId: item.id })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cakeImage}
                />
                <View style={styles.cakeContent}>
                  <Text style={styles.cakeTitle}>{item.title}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={16} color="#FFB239" />
                    <Text style={styles.cakeRating}>{item.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    navigation.navigate('EditCake', { cakeId: item.id })
                  }
                >
                  <FontAwesome name="pencil" size={20} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteCake(item.id)}
                >
                  <FontAwesome name="trash" size={20} color="#FF0000" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCake}
          >
            <FontAwesome name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleGoToHome}
          >
            <FontAwesome name="home" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.pageNavigation}>
            {[...Array(totalPages).keys()].map((page) => (
              <TouchableOpacity
                key={page + 1}
                style={[
                  styles.pageButton,
                  page + 1 === currentPage && styles.activePageButton,
                ]}
                onPress={() => handleNavigateToPage(page + 1)}
              >
                <Text style={styles.pageButtonText}>{page + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D35656',
  },
  cakeItem: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#FAF0E4',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10
  },
  cakeImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    marginLeft: 30
  },
  cakeContent: {
    flex: 1,
    marginLeft: 20,
  },
  cakeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Futura',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cakeRating: {
    fontSize: 16,
    color: '#FFB239',
    fontFamily: 'Futura',
    marginLeft: 8,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D35656',
    elevation: 2,
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  editButton: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  homeButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D35656',
    elevation: 2,
  },
  pageNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  pageButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#D35656',
  },
  activePageButton: {
    backgroundColor: '#FF7F7F',
  },
  pageButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CakeList;
