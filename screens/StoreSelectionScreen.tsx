// screens/StoreSelectionScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation'; // Импортируем RootStackParamList из navigation.tsx

type StoreSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StoreSelection'>;
type StoreSelectionScreenRouteProp = RouteProp<RootStackParamList, 'StoreSelection'>;

type Props = {
  navigation: StoreSelectionScreenNavigationProp;
  route: StoreSelectionScreenRouteProp;
};

const StoreSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const handleStoreSelect = (storeName: string) => {
    navigation.navigate('Products', { store: storeName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите магазин:</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleStoreSelect('Магазин 1')}>
        <Text style={styles.buttonText}>Магазин 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleStoreSelect('Магазин 2')}>
        <Text style={styles.buttonText}>Магазин 2</Text>
      </TouchableOpacity>
      {/* Добавьте кнопки для других магазинов */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StoreSelectionScreen;
