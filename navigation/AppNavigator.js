// navigation/AppNavigator.js
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { AuthContext } from '../AuthContext';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import UserRecipesScreen from '../screens/UserRecipesScreen';
import FavoriteRecipesScreen from '../screens/FavoriteRecipesScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#F5DAD2',
        borderTopWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      tabBarInactiveTintColor: '#707070',
      tabBarActiveTintColor: '#151515',
      tabBarActiveBackgroundColor: '#BACD92',
      tabBarItemStyle: {
        borderRadius: 30,
        marginHorizontal: 10,
        overflow: 'hidden',
      },
    }}
  >
    <Tab.Screen name="Inicio" component={HomeScreen} options={{
      headerStyle: {
        backgroundColor: '#F5DAD2'
      },
      headerTitle: 'Inicio',
      headerTitleAlign: 'center',
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarIcon: ({focused}) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/icons/home.png')}
            resizeMode='contain'
            style={{
              width: 15,
              height: 15,
              tintColor: focused ? '#151515' : '373A40',
            }}
          />
        </View>
      ),
    }} />
    <Tab.Screen name="Buscar" component={SearchScreen} options={{
      headerStyle: {
        backgroundColor: '#F5DAD2'
      },
      headerTitle: 'Buscar receta',
      headerTitleAlign: 'center',
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarIcon: ({focused}) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/icons/search.png')}
            resizeMode='contain'
            style={{
              width: 15,
              height: 15,
              tintColor: focused ? '#151515' : '373A40',
            }}
          />
        </View>
      ),
    }} />
    <Tab.Screen name="Crear" component={CreateRecipeScreen} options={{
      headerStyle: {
        backgroundColor: '#F5DAD2'
      },
      headerTitle: 'Crear receta',
      headerTitleAlign: 'center',
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarIcon: ({focused}) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/icons/create.png')}
            resizeMode='contain'
            style={{
              width: 15,
              height: 15,
              tintColor: focused ? '#151515' : '373A40',
            }}
          />
        </View>
      ),
    }} />
    <Tab.Screen name="Perfil" component={ProfileScreen} options={{
      headerStyle: {
        backgroundColor: '#F5DAD2'
      },
      headerTitle: 'Perfil',
      headerTitleAlign: 'center',
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarIcon: ({focused}) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/icons/profile.png')}
            resizeMode='contain'
            style={{
              width: 15,
              height: 15,
              tintColor: focused ? '#151515' : '373A40',
            }}
          />
        </View>
      ),
    }} />
  </Tab.Navigator>
);

const AppNavigator = ({ user }) => {
    const { user: authenticatedUser } = useContext(AuthContext);
  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'HomeTabs'}>
          {authenticatedUser ? (
            <>
              <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            </>
          )}
          <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen} options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F5DAD2'
            },
            headerTitle: 'Detalles de la receta',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
          <Stack.Screen name="UserRecipes" component={UserRecipesScreen} options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F5DAD2'
            },
            headerTitle: 'Mis recetas',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTitleStyle: {
            fontWeight: 'bold',
            }
          }} />
          <Stack.Screen name='FavoriteRecipes' component={FavoriteRecipesScreen} options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F5DAD2'
            },
            headerTitle: 'Mis recetas favoritas',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTitleStyle: {
            fontWeight: 'bold',
            }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default AppNavigator;
