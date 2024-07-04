import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";
import { AuthContext } from "../contexts/AuthContext";

type StoreSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StoreSelection"
>;

interface Store {
  id: string;
  name: string;
}

const StoreSelectionScreen: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StoreSelectionScreenNavigationProp>();
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/shop/getall");
        if (response.ok) {
          const data = await response.json();
          setStores(data);
        } else {
          console.error("Ошибка при загрузке магазинов:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при загрузке магазинов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const navigateToProducts = (store: Store) => {
    navigation.navigate("Products", { store: store.name, storeId: store.id });
  };

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <View style={styles.container}>
      {stores.length > 0 ? (
        <TouchableOpacity onPress={() => navigateToProducts(stores[0])}>
          <Text>Перейти к товарам {stores[0].name}</Text>
        </TouchableOpacity>
      ) : (
        <Text>Нет доступных магазинов</Text>
      )}
      {!isLoggedIn && (
        <View style={styles.authButtons}>
          <Button
            title="Регистрация"
            onPress={() => navigation.navigate("Register")}
          />
          <Button title="Вход" onPress={() => navigation.navigate("Login")} />
        </View>
      )}
      {isLoggedIn && <Button title="Выйти" onPress={logout} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  authButtons: {
    marginTop: 20,
  },
});

export default StoreSelectionScreen;
