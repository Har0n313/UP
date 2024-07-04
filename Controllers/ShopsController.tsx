import { useState, useEffect } from "react";
import { Shop } from "../types";

const useShopsController = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/shop/getall");
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        const data: Shop[] = await response.json();
        setShops(data);
      } catch (error) {
        console.error("Ошибка при получении данных о магазинах:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return {
    shops,
    loading,
  };
};

export default useShopsController;
