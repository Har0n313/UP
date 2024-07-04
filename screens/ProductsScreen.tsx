import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import useProductsController from "../Controllers/ProductsController";
import { Product } from "../types";
import { AuthContext } from "../contexts/AuthContext";

type ProductsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Products"
>;
type ProductsScreenRouteProp = RouteProp<RootStackParamList, "Products">;

type Props = {
  navigation: ProductsScreenNavigationProp;
  route: ProductsScreenRouteProp;
};

const ProductsScreen: React.FC<Props> = ({ route }) => {
  const { store, storeId } = route.params;
  const {
    products,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    modalVisible,
    setModalVisible,
    newProductName,
    setNewProductName,
    newProductPrice,
    setNewProductPrice,
    editingProduct,
    setEditingProduct,
    handleAddProduct,
    handlePriceChange,
  } = useProductsController(storeId);

  const { isLoggedIn } = useContext(AuthContext);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      {isLoggedIn && (
        <TouchableOpacity
          onPress={() => {
            setEditingProduct(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.changePriceButtonText}>Изменить</Text>
        </TouchableOpacity>
      )}
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
      {isLoggedIn && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingProduct(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>Добавить товар</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text>Товары в магазине {store}:</Text>}
      />
      {isLoggedIn && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {editingProduct ? "Изменить цену товара" : "Добавить новый товар"}
            </Text>
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
              <Button
                title={editingProduct ? "Изменить" : "Добавить"}
                onPress={editingProduct ? handlePriceChange : handleAddProduct}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  changePriceButtonText: {
    color: "#007bff",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: "100%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ProductsScreen;
