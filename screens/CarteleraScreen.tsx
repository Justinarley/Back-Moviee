import { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  Button as RNButton,
  TouchableOpacity,
} from 'react-native'
import Menu from '../components/Menu'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type AuthStackParamList = {
  Login: undefined
  Register: undefined
  Home: undefined
  Cartelera: undefined
}

type CarteleraScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Cartelera'>
type HomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>

const carouselData = [
  { image: require('../assets/WyD.jpg'), rating: 'Todo Público', status: 'En cartelera' },
  { image: require('../assets/Gladiador.jpg'), rating: 'Mayor de 12 años', status: 'En preventa' },
  { image: require('../assets/Venom.jpg'), rating: 'Todo Público', status: 'En cartelera' },
  { image: require('../assets/Robot.jpg'), rating: 'Mayor de 12 años', status: 'En preventa' },
  { image: require('../assets/Moana.jpg'), rating: 'Todo Público', status: 'En cartelera' },
  { image: require('../assets/Intensamente.jpg'), rating: 'Todo Público', status: 'En cartelera' },
]

export default function CarteleraScreen() {
  const navigation = useNavigation<CarteleraScreenNavigationProp>()
  const homeNavigation = useNavigation<HomeScreenNavigationProp>()
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTab, setSelectedTab] = useState<'cartelera' | 'proximamente'>('cartelera')
  const [searchQuery, setSearchQuery] = useState('')

  const handleCalendarToggle = () => setIsCalendarVisible(!isCalendarVisible)

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString)
    setIsCalendarVisible(false)
  }

  const renderMovieItem = ({ item }: { item: any }) => (
    <View style={styles.movieItem}>
      <Image source={item.image} style={styles.movieImage} />
      <Text style={styles.movieRating}>{item.rating}</Text>
      <Text style={styles.movieStatus}>{item.status}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.title}>MOVITIME</Text>
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Busca una película"
          style={styles.searchInput}
          placeholderTextColor="#AAA"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Menu />

      {/* Botón para abrir el calendario */}

      <RNButton title="Cuando quieres ver tu película?" onPress={handleCalendarToggle} />

      {/* Calendario Modal */}
      <Modal visible={isCalendarVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una fecha</Text>
            <Calendar onDayPress={handleDateSelect} />
            <RNButton title="Cerrar" onPress={() => setIsCalendarVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Subtítulos de Cartelera y Próximamente */}
      <View style={styles.tabsContainer}>
        <Text
          style={[styles.tab, selectedTab === 'cartelera' && styles.activeTab]}
          onPress={() => setSelectedTab('cartelera')}
        >
          Cartelera
        </Text>
        <Text
          style={[styles.tab, selectedTab === 'proximamente' && styles.activeTab]}
          onPress={() => setSelectedTab('proximamente')}
        >
          Próximamente
        </Text>
      </View>

      {/* Películas dependiendo del tab seleccionado */}
      <FlatList
        data={selectedTab === 'cartelera' ? carouselData : carouselData.slice(0, 2)}
        numColumns={2}
        renderItem={renderMovieItem}
        keyExtractor={(_, index) => `movie-${index}`}
        contentContainerStyle={styles.moviesContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    fontSize: 18,
    color: '#FFF',
    paddingBottom: 5,
    marginHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  movieItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  movieImage: {
    width: 150,
    height: 225,
    borderRadius: 12,
  },
  movieRating: {
    color: '#FFF',
    marginTop: 5,
  },
  movieStatus: {
    color: '#FFF',
    marginTop: 5,
  },
  moviesContainer: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 10,
    color: '#FFF',
  },
})
