import React, { useState } from 'react';
import { Button, InputNumber, Form, message, Input, Modal } from 'antd';

const ReservaCitaForm = () => {
  const [entradas, setEntradas] = useState(1); // Número de entradas, comenzando en 1
  const [nombrePelicula, setNombrePelicula] = useState(""); // Para el nombre de la película
  const [fechaFuncion, setFechaFuncion] = useState(""); // Para la fecha de la función
  const [horaFuncion, setHoraFuncion] = useState(""); // Para la hora de la función

  const [isModalVisible, setIsModalVisible] = useState(false); // Para controlar la visibilidad del modal

  // Manejar el cambio de entradas
  const handleEntradasChange = (value: number | null) => {
    if (value !== null) {
      setEntradas(value);
    }
  };

  // Mostrar el modal con los datos de la cita
  const handleSubmit = (values: any) => {
    setNombrePelicula(values.nombrePelicula);
    setFechaFuncion(values.fechaFuncion);
    setHoraFuncion(values.horaFuncion);
    
    setIsModalVisible(true); // Abrir el modal

    // Aquí puedes hacer la lógica para enviar los datos al backend
    const data = {
      nombrePelicula: values.nombrePelicula,
      fechaFuncion: values.fechaFuncion,
      horaFuncion: values.horaFuncion,
      entradas: entradas,
    };

    fetch('http://localhost:8080/api-citas/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        message.success('Cita registrada exitosamente!');
      })
      .catch((error) => {
        message.error('Error al registrar la cita');
      });
  };

  // Cerrar el modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={styles.container}>
      <Form onFinish={handleSubmit} layout="vertical" style={styles.form}>
        <Form.Item
          label="Nombre de la Película"
          name="nombrePelicula"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de la película' }]} >
          <Input style={styles.input} />
        </Form.Item>

        <Form.Item
          label="Fecha de la Función"
          name="fechaFuncion"
          rules={[{ required: true, message: 'Por favor ingresa la fecha de la función' }]} >
          <Input type="date" style={styles.input} />
        </Form.Item>

        <Form.Item
          label="Hora de la Función"
          name="horaFuncion"
          rules={[{ required: true, message: 'Por favor ingresa la hora de la función' }]} >
          <Input type="time" style={styles.input} />
        </Form.Item>

        <Form.Item
          label="Número de Entradas"
          name="entradas">
          <InputNumber 
            min={1} 
            value={entradas} 
            onChange={handleEntradasChange} 
            style={styles.inputNumber}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={styles.button}>
            Comprar Entradas
          </Button>
        </Form.Item>
      </Form>

      {/* Modal para mostrar los datos de la cita */}
      <Modal
        title="Confirmar Reserva"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[ 
          <Button key="back" onClick={handleCancel} style={styles.modalButton}>
            Cerrar
          </Button>,
        ]}
      >
        <p><strong>Nombre de la película:</strong> {nombrePelicula}</p>
        <p><strong>Fecha de la función:</strong> {fechaFuncion}</p>
        <p><strong>Hora de la función:</strong> {horaFuncion}</p>
        <p><strong>Entradas:</strong> {entradas}</p>
      </Modal>
    </div>
  );
};

// Estilos mejorados
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#121212',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: 'auto',
    color: '#fff', // Color blanco para todo el contenedor
  },
  form: {
    backgroundColor: '#1f1f1f',
    padding: '20px',
    borderRadius: '8px',
    color: '#fff', // Color blanco para todo el formulario
  },
  input: {
    backgroundColor: '#333',
    borderRadius: '8px',
    color: '#fff', // Color blanco para el texto del input
    padding: '10px',
  },
  inputNumber: {
    backgroundColor: '#333',
    borderRadius: '8px',
    color: '#fff', // Color blanco para el texto del InputNumber
    padding: '10px',
    width: '100%',
  },
  button: {
    backgroundColor: '#5A5A5A',
    color: '#fff', // Color blanco para el texto del botón
    fontSize: '16px',
    borderRadius: '8px',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#5A5A5A',
    color: '#fff', // Color blanco para el texto del botón en el modal
    fontSize: '16px',
    borderRadius: '8px',
  },
  label: {
    color: '#fff', // Color blanco para los labels
  },
};

export default ReservaCitaForm;
