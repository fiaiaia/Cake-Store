import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CakeList from './src/components/CakeList';
import CakeDetail from './src/components/CakeDetail';
import AddCake from './src/components/AddCake';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="CakeList"
          component={CakeList}
          options={{
            title: 'List of Cakes',
            headerStyle: styles.header,
            headerLeft: null,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="CakeDetail"
          component={CakeDetail}
          options={{
            title: 'Cake Detail',
            headerStyle: styles.header,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AddCake"
          component={AddCake}
          options={{
            title: 'Add Cake',
            headerStyle: styles.header,
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/cake_bg.jpg')}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Welcome to Cake Store</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CakeList')}
        >
          <Text style={styles.buttonText}>View Cakes</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Expletus Sans',
    marginBottom: 50,
    color: '#D35656',
  },
  button: {
    backgroundColor: '#D35656',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Futura',
    color: '#FFFFFF',
  },
  header: {
    backgroundColor: '#D35656',
  },
});

export default App;
