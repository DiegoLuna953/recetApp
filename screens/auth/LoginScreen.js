// screens/auth/LoginScreen.js
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import users from '../../users.json'
import { AuthContext } from '../../AuthContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { signIn } = useContext(AuthContext);
  
    const handleLogin = async () => {
      try {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          signIn(user);
        } else {
          Alert.alert('Error', 'Correo o contraseña incorrectos');
        }
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema con el inicio de sesión. Inténtalo nuevamente.');
      }
    };
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.logoContainer}>
            <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Correo'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder='Contraseña'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer2}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
              <Text style={styles.buttonText}>Resgitarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCFFE0'
    },
    inputContainer:{
        width: '80%'
    },
    input: {
        backgroundColor: '#FFE8C5',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    buttonContainer2: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
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
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 40
    }
})
