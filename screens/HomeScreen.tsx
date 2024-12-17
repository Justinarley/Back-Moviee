import { useRef, useEffect } from 'react'
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
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Menu from '../components/Menu';


// Tipos del stack de navegación
type AuthStackParamList = {
  Login: undefined
  Register: undefined
  Home: undefined
  Cartelera: undefined
};

type HomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>()

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.title}>MOVITIME</Text>
      </View>

      {/* Bienvenida y botón en fila */}
      <View style={styles.welcomeRow}>
        <Text style={styles.welcomeText}>
          Bienvenido, <Text style={styles.boldText}>Usuario</Text>
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
          <Image source={item} style={styles.carouselImage} />
        )}
        contentContainerStyle={styles.carouselContainer}
        // Ajusta la vista para que solo se vea una imagen a la vez
        snapToInterval={400} // El ancho de cada imagen
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
})
