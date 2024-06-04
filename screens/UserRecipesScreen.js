// screens/UserRecipesScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import recipesData from '../recipes.json';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 10;
const ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2;

const UserRecipesScreen = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();

  const userRecipes = recipesData.filter(recipe => recipe.author === username);

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
      {userRecipes.map(renderRecipeItem)}
    </ScrollView>
  );
};

export default UserRecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
