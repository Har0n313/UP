// screens/ProductsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation'; // Импортируем RootStackParamList из navigation.tsx
import { Product } from '../types'; // ИмпортиЫруем тип Product

type ProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Products'>;
type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'Products'>;

type Props = {
  navigation: ProductsScreenNavigationProp;
  route: ProductsScreenRouteProp;
};

const mockProducts: Product[] = [
  { Product_ID: 1, Name: 'Картошка', Price: 10, Category_ID: 1 },
  { Product_ID: 2, Name: 'Помидоры', Price: 20, Category_ID: 1 },
  { Product_ID: 3, Name: 'Огурцы', Price: 30, Category_ID: 1 },
  { Product_ID: 4, Name: 'Картон', Price: 30, Category_ID: 1 },
  { Product_ID: 5, Name: 'Кастрюля', Price: 30, Category_ID: 1 },
  { Product_ID: 6, Name: 'Половник', Price: 30, Category_ID: 1 },
  { Product_ID: 7, Name: 'Капуста', Price: 30, Category_ID: 1 },
];

const ProductsScreen: React.FC<Props> = ({ route }) => {
  const { store } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Здесь можете вызвать API магазина для получения списка товаров
    // и установить его в состояние products
    // Например:
    // fetchProducts(store).then((data) => setProducts(data));
    setProducts(mockProducts); // Временно используем моковые данные
    setFilteredProducts(mockProducts);
  }, [store]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.Name}</Text>
      <Text>{item.Price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск товаров..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.Product_ID.toString()}
        ListHeaderComponent={<Text>Товары в магазине {store}:</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default ProductsScreen;
