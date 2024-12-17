import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type AuthStackParamList = {
  Profile: undefined;
  Home: undefined;
  Cartelera: undefined;
  Menu: undefined;
  Reservas: undefined;
};

type MenuScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Menu'>;

export default function Menu (){
  const navigation = useNavigation<MenuScreenNavigationProp>();

  return (
    <View style={styles.menuContainer}>
      {/* Opción "Inicio" */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.menuItemText}>Inicio</Text>
      </TouchableOpacity>

      {/* Opción "Cartelera" */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Cartelera')}
      >
        <Icon name="film" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.menuItemText}>Cartelera</Text>
      </TouchableOpacity>

      {/* Opción "Reservas" */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Reservas')}
      >
        <Icon name="ticket" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.menuItemText}>Compras</Text>
      </TouchableOpacity>

      {/* Opción "Perfil" */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name="user" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.menuItemText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#333',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    paddingRight: 5,
  },
});

