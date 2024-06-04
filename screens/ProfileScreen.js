// screens/ProfileScreen.js
import React, { useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleMyRecipesPress = () => {
    navigation.navigate('UserRecipes', { username: user.username });
  };

  const handleFavoriteRecipesPress = () => {
    navigation.navigate('FavoriteRecipes');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.userInfo}>
        <Text style={styles.username}>Bienvenido</Text>
        <Text style={styles.username}>{user ? user.username : 'Usuario'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleMyRecipesPress} style={styles.button}>
          <Text style={styles.buttonText}>Mis Recetas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavoriteRecipesPress} style={styles.button}>
          <Text style={styles.buttonText}>Recetas Favoritas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFFE0',
  },
  userInfo: {
    marginBottom: 100,
  },
  username: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#97BE5A',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#FF5A5F',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
