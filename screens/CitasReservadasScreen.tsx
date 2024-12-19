import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Menu from '../components/Menu';

// Definimos los tipos para la navegación
type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Cartelera: undefined;
    Compras: undefined;
    Reservas: undefined;
};

type ReservaScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Reservas'>;

// Interfaz para las citas
interface CitaPeliculasCine {
    id: number;
    nombrePelicula: string;
    fechaFuncion: string; // O Date, si prefieres trabajar con objetos Date
    horaFuncion: string;  // O Date, si la hora es un objeto Date
}

export default function CitasReservadasScreen() {
    const navigation = useNavigation<ReservaScreenNavigationProp>();
    const [citas, setCitas] = useState<CitaPeliculasCine[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCita, setSelectedCita] = useState<CitaPeliculasCine | null>(null);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get('https://movitime.byronrm.com/api-citas/all');
                setCitas(response.data);
            } catch (error) {
                console.error('Error fetching citas', error);
            }
        };

        fetchCitas();
    }, []);

    const handleCitaPress = (cita: CitaPeliculasCine) => {
        setSelectedCita(cita);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.title}>MOVITIME</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Citas Reservadas</Text>
            <Menu />

            {/* Espacio entre el Menu y la lista */}
            <View style={styles.spacing} />

            <FlatList
                data={citas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCitaPress(item)} style={styles.citaItem}>
                        <Text style={styles.citaText}>
                            {item.nombrePelicula} - {item.fechaFuncion} {item.horaFuncion}
                        </Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalles de la Cita</Text>
                        <Text style={styles.modalText}>Película: {selectedCita?.nombrePelicula}</Text>
                        <Text style={styles.modalText}>Fecha: {selectedCita?.fechaFuncion}</Text>
                        <Text style={styles.modalText}>Hora: {selectedCita?.horaFuncion}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
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
    listContainer: {
        paddingBottom: 20,
    },
    header: {
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    citaItem: {
        backgroundColor: '#333',
        marginBottom: 15,
        padding: 15,
        borderRadius: 12,
    },
    citaText: {
        color: '#FFF',
        fontSize: 18,
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#5A5A5A',
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
    spacing: {
        height: 20,  // Puedes ajustar este valor según el espacio que quieras
    }
});
