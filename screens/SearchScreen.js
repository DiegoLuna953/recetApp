// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import recipes from '../recipes.json';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 20;
const ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2;

const SearchScreen = () => {
  const navigation = useNavigation();
  const [ingredient, setIngredient] = useState('');
  const [error, setError] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const handleSearch = () => {
    if (!ingredient.trim()) {
      setError('Por favor ingrese un ingrediente o el nombre de la receta');
      return;
    }

    const keyword = ingredient.trim().toLowerCase();

    const filteredRecipes = recipes.filter(recipe =>
      recipe.ingredients.some(ing => ing.toLowerCase().includes(keyword)) || 
      recipe.name.toLowerCase().includes(keyword)
    );

    if (filteredRecipes.length === 0) {
      setError('No se encontraron recetas con ese ingrediente');
    } else {
      setFilteredRecipes(filteredRecipes);
      setError(null);
    }
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
    >
      <Text style={styles.textSalida}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Ingrese el ingrediente'
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.textButton}>Obtener recetas</Text>
        </TouchableOpacity>
      </View>
      {error && <Text>{error}</Text>}
      {filteredRecipes.length > 0 && (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.recipeList}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFE0',
    alignItems: 'center',
    paddingTop: 30,
    width: '100%'
  },
  buttonContainer: {
    alignItems: 'center',
    width: '80%',
    padding: 10,
  },
  textInput: {
    backgroundColor: '#FFE8C5',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#97BE5A',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textSalida: {
    textAlign: 'center',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20
  },
  textSalidaSub: {
    textAlign: 'center',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 15
  },
  recipeList: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  recipeItem: {
    width: ITEM_WIDTH,
    backgroundColor: '#75A47F',
    borderRadius: 10,
    marginBottom: ITEM_MARGIN,
    marginHorizontal: 6,
    height: 80,
    textAlign: 'center'
  },
});
