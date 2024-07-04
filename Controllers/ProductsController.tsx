// ProductsController.tsx
import { useState, useEffect } from "react";
import { Product } from "../types";

const useProductsController = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<string>("");
  const [newProductCategoryId, setNewProductCategoryId] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/getall"
        );
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const handleAddProduct = async () => {
    if (newProductName && newProductPrice && newProductCategoryId) {
      const newProduct = {
        name: newProductName,
        price: parseFloat(newProductPrice),
        categoryId: "b0aa2122-4b4e-4290-b3a1-828e64695f86",
      };

      console.log("Добавление продукта:", newProduct);

      try {
        const response = await fetch(
          "http://localhost:5000/api/product/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        );

        if (response.ok) {
          console.log("Продукт успешно добавлен");
          // Fetch updated products list
          const updatedProductsResponse = await fetch(
            "http://localhost:5000/api/product/getall"
          );
          const updatedProducts: Product[] =
            await updatedProductsResponse.json();
          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts);
          setModalVisible(false);
          setNewProductName("");
          setNewProductPrice("");
          setNewProductCategoryId("");
        } else {
          console.error("Ошибка при добавлении товара:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при добавлении товара:", error);
      }
    } else {
      console.error("Все поля должны быть заполнены");
    }
  };

  const handlePriceChange = async () => {
    if (editingProduct && newProductPrice) {
      const updatedProduct = {
        id: editingProduct.id,
        name: editingProduct.name,
        price: parseFloat(newProductPrice),
      };

      console.log("Изменение продукта:", updatedProduct);

      try {
        const response = await fetch(
          `http://localhost:5000/api/product/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (response.ok) {
          console.log("Продукт успешно изменен");
          // Fetch updated products list
          const updatedProductsResponse = await fetch(
            "http://localhost:5000/api/product/getall"
          );
          const updatedProducts: Product[] =
            await updatedProductsResponse.json();
          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts);
          setModalVisible(false);
          setEditingProduct(null);
          setNewProductPrice("");
        } else {
          console.error("Ошибка при изменении товара:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при изменении товара:", error);
      }
    } else {
      console.error("Цена должна быть заполнена");
    }
  };

  return {
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
    newProductCategoryId,
    setNewProductCategoryId,
    editingProduct,
    setEditingProduct,
    handleAddProduct,
    handlePriceChange,
  };
};

export default useProductsController;
