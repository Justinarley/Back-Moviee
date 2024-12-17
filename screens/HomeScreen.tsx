import axios from 'axios'
import Menu from '../components/Menu'
import { useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Tipos del stack de navegación
type AuthStackParamList = {
  Login: undefined
  Register: undefined
  Home: undefined
  Cartelera: undefined
  Compras: undefined
}

type HomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const [userName, setUserName] = useState<string>('')

  const carouselData = [
    require('../assets/WyD.jpg'),
    require('../assets/Gladiador.jpg'),
    require('../assets/Venom.jpg'),
    require('../assets/Robot.jpg'),
    require('../assets/Moana.jpg'),
    require('../assets/Intensamente.jpg'),
  ]

  const promotions = [
    require('../assets/PROMO1.png'),
    require('../assets/PROMO2.jpg'),
    require('../assets/PROMO3.png'),
    require('../assets/PROMO4.png'),
  ]

  // Carrusel automático
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListRef = useRef<FlatList>(null)

  // Variable para el índice actual
  const currentIndex = useRef(0)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        if (token) {
          const response = await axios.get('https://movitime.byronrm.com/api-users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          })
          setUserName(response.data.nombre)
        }
      } catch (error) {
        console.error('Error fetching user data', error)
      }
    }
    fetchUserData()

    const interval = setInterval(() => {
      // Avanzar al siguiente índice de forma circular
      currentIndex.current = (currentIndex.current + 1) % carouselData.length
      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [carouselData.length])

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const handleImagePress = (image: any) => {
    setSelectedImage(image)
    setModalVisible(true)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.title}>MOVITIME</Text>
      </View>

      {/* Bienvenida y botón en fila */}
      <View style={styles.welcomeRow}>
        <Text style={styles.welcomeText}>
          Bienvenido, <Text style={styles.boldText}>{userName || 'Usuario'}</Text>
        </Text>
        <TouchableOpacity
          style={styles.carteleraButton}
          onPress={() => navigation.navigate('Cartelera')}
        >
          <Text style={styles.carteleraButtonText}>Cartelera</Text>
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Busca una película"
          style={styles.searchInput}
          placeholderTextColor="#AAA"
        />
      </View>

      <Menu />

      {/* Carrusel */}
      <Text style={styles.carouselTitle}>Estrenos</Text>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `carousel-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={item} style={styles.carouselImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.carouselContainer}
        snapToInterval={400}
        decelerationRate="fast"
        snapToAlignment="center"
      />

      {/* Promociones */}
      <Text style={styles.promoTitle}>Promociones</Text>
      <View style={styles.promosContainer}>
        {promotions.map((promo, index) => (
          <Image key={index} source={promo} style={styles.promoImage} />
        ))}
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={selectedImage} style={styles.modalImage} />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                  // Aquí puedes agregar la lógica para comprar entradas
                  setModalVisible(false)
                  navigation.navigate('Compras') 
                }}
              >
                <Text style={styles.buttonText}>Comprar entradas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingBottom: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFF',
  },
  boldText: {
    fontWeight: 'bold',
  },
  carteleraButton: {
    backgroundColor: '#5A5A5A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carteleraButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 10,
    color: '#FFF',
  },
  carouselTitle: {
    color: '#FFF',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20,
  },
  carouselContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  carouselImage: {
    width: 350,
    height: 500,
    marginRight: 10,
    borderRadius: 12,
  },
  promoTitle: {
    color: '#FFF',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20,
  },
  promosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  promoImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buyButton: {
    backgroundColor: '#5A5A5A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF5733',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
