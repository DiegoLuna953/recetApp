// App.js
import React, { useRef, useEffect, useState } from 'react';
import { View, StatusBar, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './AuthContext';

export default function App() {
  const translateYAnimation = useRef(new Animated.Value(0)).current;
  const [showContent, setShowContent] = useState(false);
  const { height } = Dimensions.get('window');
  const logoSize = height * 0.3;

  useEffect(() => {
    Animated.timing(translateYAnimation, {
      toValue: -height,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => setShowContent(true));
  }, []);

  return (
    <AuthProvider>
      <View style={styles.container}>
        <Animated.View style={[styles.animationContainer, { transform: [{ translateY: translateYAnimation }] }]}>
          <Image
            source={require('./assets/logo.png')}
            style={[styles.logo, { width: logoSize, height: logoSize }]}
          />
        </Animated.View>
        {showContent && (
          <View style={styles.contentContainer}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppNavigator />
          </View>
        )}
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFE0',
  },
  contentContainer: {
    flex: 1,
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFFE0',
  },
  logo: {
    resizeMode: 'contain',
  },
});
