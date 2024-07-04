export interface City {
  CityID: number;
  Name: string;
}

export interface Area {
  Area_ID: number;
  Name: string;
  City_ID: number;
  ShopQuantity: number;
}

export interface User {
  UserID: number;
  Name: string;
  Email: string;
  Password: string;
  CityID: number;
}

export interface Shop {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

export interface ShopOfProduct {
  Shop_ID: number;
  Product_ID: number;
}

export interface Price {
  Product_ID: number;
  DateCreate: string;
  Price: number;
}

export interface Category {
  Category_Id: number;
  Name: string;
  ParentCategory?: string;
}
