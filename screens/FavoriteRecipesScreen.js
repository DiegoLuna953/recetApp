// screens/FavoriteRecipesScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 10;
const ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2;

const FavoriteRecipesScreen = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getFavoriteRecipes = async () => {
      try {
        if (user) {

          const username = user.username;

          const favorites = await AsyncStorage.getItem(`favoriteRecipes_${username}`);
          if (favorites) {
            setFavoriteRecipes(JSON.parse(favorites));
          }
        }
      } catch (error) {
        console.error('Error al obtener las recetas favoritas:', error);
      }
    };

    getFavoriteRecipes();
  }, [user]);

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.recipeContainer, { width: ITEM_WIDTH }]}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.author}>Autor: {item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas Favoritas</Text>
      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <Text style={styles.emptyMessage}>No tienes recetas favoritas aún.</Text>
      )}
    </View>
  );
};

export default FavoriteRecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFE0',
    padding: ITEM_MARGIN,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeContainer: {
    backgroundColor: '#75A47F',
    borderRadius: 10,
    marginBottom: ITEM_MARGIN,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  author: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyMessage: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
