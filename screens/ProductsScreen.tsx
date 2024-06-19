import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation'; 
import { Product, ShopOfProduct } from '../types'; 

type ProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Products'>;
type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'Products'>;

type Props = {
  navigation: ProductsScreenNavigationProp;
  route: ProductsScreenRouteProp;
};

const mockProducts: Product[] = [
  { Product_ID: 1, Name: 'Картошка', Price: 10, Category_ID: 1 },
  { Product_ID: 2, Name: 'Помидоры', Price: 20, Category_ID: 1 },
  { Product_ID: 3, Name: 'Огурцы', Price: 9, Category_ID: 1 },
  { Product_ID: 4, Name: 'Картон', Price: 11, Category_ID: 1 },
  { Product_ID: 5, Name: 'Кастрюля', Price: 100, Category_ID: 1 },
  { Product_ID: 6, Name: 'Половник', Price: 40, Category_ID: 1 },
  { Product_ID: 7, Name: 'Капуста', Price: 12, Category_ID: 1 },
];
const mockShopOfProducts: ShopOfProduct[] = [
  { Shop_ID: 1, Product_ID: 1 },
  { Shop_ID: 1, Product_ID: 2 },
  { Shop_ID: 1, Product_ID: 3 },
  { Shop_ID: 2, Product_ID: 4 },
  { Shop_ID: 2, Product_ID: 5 },
  { Shop_ID: 2, Product_ID: 6 },
  { Shop_ID: 3, Product_ID: 7 },
];

const ProductsScreen: React.FC<Props> = ({ route }) => {
  const { store, storeId } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newProductName, setNewProductName] = useState<string>('');
  const [newProductPrice, setNewProductPrice] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storeProducts = mockShopOfProducts
      .filter(shopProduct => shopProduct.Shop_ID === storeId)
      .map(shopProduct => mockProducts.find(product => product.Product_ID === shopProduct.Product_ID))
      .filter((product): product is Product => product !== undefined);

    setProducts(storeProducts);
    setFilteredProducts(storeProducts);
  }, [storeId]);

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

  const handleAddProduct = () => {
    if (newProductName && newProductPrice) {
      const newProduct: Product = {
        Product_ID: products.length + 1,
        Name: newProductName,
        Price: parseFloat(newProductPrice),
        Category_ID: 1,
      };
      setProducts([...products, newProduct]);
      setFilteredProducts([...products, newProduct]);
      setModalVisible(false);
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  const handlePriceChange = () => {
    if (editingProduct && newProductPrice) {
      const updatedProducts = products.map(product =>
        product.Product_ID === editingProduct.Product_ID
          ? { ...product, Price: parseFloat(newProductPrice) }
          : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setModalVisible(false);
      setEditingProduct(null);
      setNewProductPrice('');
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Text>{item.Name}</Text>
      <Text>{item.Price}</Text>
      <TouchableOpacity onPress={() => { setEditingProduct(item); setModalVisible(true); }}>
        <Text style={styles.changePriceButtonText}>Изменить</Text>
      </TouchableOpacity>
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => { setEditingProduct(null); setModalVisible(true); }}
      >
        <Text style={styles.addButtonText}>Добавить товар</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.Product_ID.toString()}
        ListHeaderComponent={<Text>Товары в магазине {store}:</Text>}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{editingProduct ? 'Изменить цену товара' : 'Добавить новый товар'}</Text>
          {!editingProduct && (
            <TextInput
              style={styles.input}
              placeholder="Название товара"
              value={newProductName}
              onChangeText={setNewProductName}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Цена товара"
            value={newProductPrice}
            onChangeText={setNewProductPrice}
            keyboardType="numeric"
          />
          <View style={styles.modalButtons}>
            <Button title="Отмена" onPress={() => setModalVisible(false)} />
            <Button title={editingProduct ? 'Изменить' : 'Добавить'} onPress={editingProduct ? handlePriceChange : handleAddProduct} />
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  productInfo: {
    flex: 1,
  },
  changePriceButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  changePriceButtonText: {
    color: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '100%',
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProductsScreen;
