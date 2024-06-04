// screens/CreateRecipeScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const CreateRecipeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSaveRecipe = () => {
    const newRecipe = {
      id: recipes.length + 1,
      name: recipeName,
      ingredients: ingredients.split('\n'), // Convertir la lista de ingredientes en un array
      instructions: instructions.split('\n'), // Convertir las instrucciones en un array
    };

    setRecipes([...recipes, newRecipe]);
    // Limpiar los campos después de guardar la receta
    setRecipeName('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta"
        value={recipeName}
        onChangeText={text => setRecipeName(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Ingredientes (separados por salto de línea)"
        multiline
        value={ingredients}
        onChangeText={text => setIngredients(text)}
      />
      <TextInput
        style={[styles.input, { height: 200 }]}
        placeholder="Instrucciones (separadas por salto de línea)"
        multiline
        value={instructions}
        onChangeText={text => setInstructions(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveRecipe}>
        <Text style={styles.buttonText}>Guardar Receta</Text>
      </TouchableOpacity>

      {/* Mostrar las recetas temporales */}
      {recipes.map(recipe => (
        <View key={recipe.id} style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <Text style={styles.recipeText}>Ingredientes: {recipe.ingredients.join(', ')}</Text>
          <Text style={styles.recipeText}>Instrucciones: {recipe.instructions.join(', ')}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default CreateRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FCFFE0'
  },
  input: {
    backgroundColor: '#FFE8C5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#97BE5A',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipeContainer: {
    backgroundColor: '#75A47F',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  recipeText: {
    fontSize: 16,
  },
});
