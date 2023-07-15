import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const AddCake = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');

  const handleAddCake = () => {
    if (
      title.trim() === '' ||
      description.trim() === '' ||
      rating.trim() === '' ||
      image.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Check if image URL is valid
      new URL(image.trim());
    } catch (error) {
      alert('Please enter a valid image URL');
      return;
    }

    const newCake = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      rating: parseFloat(rating),
      image: image.trim(),
    };

    navigation.navigate('CakeList', { newCake });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Cake</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCake}>
        <Text style={styles.buttonText}>Add Cake</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFBF5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  addButton: {
    backgroundColor: '#D35656',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCake;
