// screens/RecipeDetailScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import recipes from '../recipes.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

const RecipeDetailScreen = ({ route }) => {
    const { recipeId } = route.params;
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    const { user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [addedToFavorites, setAddedToFavorites] = useState(false);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const addToFavorites = async () => {
        try {
            if (currentUser) {
                const username = currentUser.username;
                const favoritesKey = `favoriteRecipes_${username}`;
                const favorites = await AsyncStorage.getItem(favoritesKey);
                let favoritesArray = favorites ? JSON.parse(favorites) : [];
                if (!favoritesArray.find(item => item.id === recipe.id)) {
                    favoritesArray.push(recipe);
                    await AsyncStorage.setItem(favoritesKey, JSON.stringify(favoritesArray));
                    setAddedToFavorites(true);
                    // Mostrar un mensaje de que la receta se ha agregado a favoritos
                    showToast();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const showToast = () => {
        ToastAndroid.show('Receta agregada a favoritos', ToastAndroid.SHORT);
    };

    const renderInstructions = () => {
        return recipe.instructions.map((step, index) => (
            <Text key={index} style={styles.instruction}>
                {index + 1}. {step}
            </Text>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{recipe.name}</Text>
            <Text style={styles.author}>Autor: {recipe.author}</Text>
            <Text style={styles.subtitle}>Ingredientes:</Text>
            {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.text}>{ingredient}</Text>
            ))}
            <Text style={styles.subtitle}>Instrucciones:</Text>
            {renderInstructions()}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={addToFavorites}>
                    <Text style={styles.buttonText}>Agregar a favoritos</Text>
                </TouchableOpacity>
            </View>
            {addedToFavorites && (
                <Text style={styles.addedToFavorites}>Receta agregada a favoritos</Text>
            )}
        </ScrollView>
    );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FCFFE0',
        paddingTop: 50,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    author: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingTop: 30
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        paddingTop: 10
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    instruction: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 10,
        paddingTop: 10
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10
    },
    button: {
        backgroundColor: '#BACD92',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    addedToFavorites: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: 'green',
    },
});
