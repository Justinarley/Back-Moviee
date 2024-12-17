// navigation/AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CarteleraScreen from '../screens/CarteleraScreen';
import ProfileScreen from '../screens/ProfileScreen';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Cartelera: undefined;
  Profile: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <AuthStack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Cartelera" component={CarteleraScreen} />
      <AuthStack.Screen name="Profile" component={ProfileScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
