// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import recipes from '../recipes.json';

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 10;
const ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2; // Calcula el ancho de cada elemento

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderRecipeItem = (recipe) => (
    <TouchableOpacity 
      key={recipe.id} 
      style={[styles.recipeContainer, { width: ITEM_WIDTH }]} 
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
    >
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.author}>{recipe.author}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recipes.map(renderRecipeItem)}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: ITEM_MARGIN,
    backgroundColor: '#FCFFE0',
  },
  recipeContainer: {
    backgroundColor: '#75A47F',
    borderRadius: 10,
    marginBottom: ITEM_MARGIN,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
