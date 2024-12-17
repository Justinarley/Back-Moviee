import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import Menu from '../components/Menu';

type AuthStackParamList = {
  Profile: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    fechaNacimiento: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('Token:', token);  // Verifica que el token esté disponible
        const response = await axios.get('http://localhost:8080/api-users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Usuario registrado:', response.data);  // Verifica la respuesta
        setUserData(response.data); // Aquí se setea todo el objeto del usuario
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        await axios.put('http://localhost:8080/api-users/profile', userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsEditing(false); // Deshabilitar edición
        Alert.alert('Éxito', 'Datos actualizados correctamente');
      }
    } catch (error) {
      console.error('Error saving user data', error);
      Alert.alert('Error', 'No se pudo guardar los datos');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.navigate('Login');
  };

  return (

    <View style={styles.container}>
      <Menu />
      <Text style={styles.title}>Mi Perfil</Text>
      <TextInput
        value={userData.nombre}
        editable={isEditing}
        placeholder="Nombre"
        onChangeText={(value) => setUserData({ ...userData, nombre: value })}
        style={[styles.input, !isEditing && styles.inputDisabled]}
      />
      <TextInput
        value={userData.apellido}
        editable={isEditing}
        placeholder="Apellido"
        onChangeText={(value) => setUserData({ ...userData, apellido: value })}
        style={[styles.input, !isEditing && styles.inputDisabled]}
      />
      <TextInput
        value={userData.correo}
        editable={isEditing}
        placeholder="Correo"
        onChangeText={(value) => setUserData({ ...userData, correo: value })}
        style={[styles.input, !isEditing && styles.inputDisabled]}
      />
      <TextInput
        value={userData.celular}
        editable={isEditing}
        placeholder="Celular"
        onChangeText={(value) => setUserData({ ...userData, celular: value })}
        style={[styles.input, !isEditing && styles.inputDisabled]}
      />
      <TextInput
        value={userData.fechaNacimiento}
        editable={isEditing}
        placeholder="Fecha de Nacimiento"
        onChangeText={(value) => setUserData({ ...userData, fechaNacimiento: value })}
        style={[styles.input, !isEditing && styles.inputDisabled]}
      />

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonEdit} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    color: '#FFF',
    marginBottom: 15,
  },
  inputDisabled: {
    backgroundColor: '#222',
    color: '#AAA',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonEdit: {
    backgroundColor: '#E50914',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonSave: {
    backgroundColor: '#00B894',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonLogout: {
    backgroundColor: '#D63031',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
