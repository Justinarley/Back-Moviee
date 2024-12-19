import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import axios from 'axios'

// Tipos del stack de navegación
type AuthStackParamList = {
  Home: undefined
  Cartelera: undefined
  Compras: undefined
}

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Compras'>

export default function ReservaCitaForm() {
  const navigation = useNavigation<NavigationProp>()

  const [nombrePelicula, setNombrePelicula] = useState('')
  const [fechaFuncion, setFechaFuncion] = useState('')
  const [horaFuncion, setHoraFuncion] = useState('')
  const [entradas, setEntradas] = useState('1')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleSubmit = async () => {
    const data = {
      nombrePelicula,
      fechaFuncion,
      horaFuncion,
      entradas: Number(entradas),
    }

    try {
      await axios.post('https://movitime.byronrm.com/api-citas/register', data)
      setIsModalVisible(true)
    } catch (error) {
      console.error('Error al registrar la cita', error)
    }
  }

  const handleConfirm = () => {
    setIsModalVisible(false)
    navigation.navigate('Home') // Redirige al Home
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservar Cita</Text>

      {/* Input: Nombre de la Película */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre de la Película</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el nombre"
          placeholderTextColor="#AAA"
          value={nombrePelicula}
          onChangeText={setNombrePelicula}
        />
      </View>

      {/* Input: Fecha de la Función */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha de la Función</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#AAA"
          value={fechaFuncion}
          onChangeText={setFechaFuncion}
        />
      </View>

      {/* Input: Hora de la Función */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora de la Función</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          placeholderTextColor="#AAA"
          value={horaFuncion}
          onChangeText={setHoraFuncion}
        />
      </View>

      {/* Input: Número de Entradas */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Número de Entradas</Text>
        <TextInput
          style={styles.input}
          placeholder="1"
          placeholderTextColor="#AAA"
          keyboardType="numeric"
          value={entradas}
          onChangeText={setEntradas}
        />
      </View>

      {/* Botón de Confirmar */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirmar Reserva</Text>
      </TouchableOpacity>

      {/* Modal de Confirmación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Reserva</Text>
            <Text style={styles.modalText}>Película: {nombrePelicula}</Text>
            <Text style={styles.modalText}>Fecha: {fechaFuncion}</Text>
            <Text style={styles.modalText}>Hora: {horaFuncion}</Text>
            <Text style={styles.modalText}>Entradas: {entradas}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Regresar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
    width: '90%',
  },
  label: {
    color: '#FFF',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: '25%',
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    color: '#FFF',
    width: '50%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#5A5A5A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '30%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#FF5733',
    marginHorizontal: 5,
  },
})
