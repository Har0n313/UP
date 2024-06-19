import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation'; // Импортируйте RootStackParamList

type StoreSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StoreSelection'>;

const StoreSelectionScreen: React.FC = () => {
  const navigation = useNavigation<StoreSelectionScreenNavigationProp>();

  const navigateToProducts = (store: string, storeId: number) => {
    navigation.navigate('Products', { store, storeId });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigateToProducts('Магазин 1', 1)}>
        <Text>Перейти к товарам Магазин 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToProducts('Магазин 2', 2)}>
        <Text>Перейти к товарам Магазин 2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoreSelectionScreen;
