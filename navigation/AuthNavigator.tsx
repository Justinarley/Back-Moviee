import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CarteleraScreen from '../screens/CarteleraScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ReservaCitaForm from '../screens/Compra';
import CitasReservadasScreen from '../screens/CitasReservadasScreen';


type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Cartelera: undefined;
  Profile: undefined;
  Compras: undefined;
  Reservas: undefined;
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
      <AuthStack.Screen name="Compras" component={ReservaCitaForm} />
      <AuthStack.Screen name="Reservas" component={CitasReservadasScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
