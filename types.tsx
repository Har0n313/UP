export interface City {
    City_ID: number;
    Name: string;
  }
  
  export interface Area {
    Area_ID: number;
    Name: string;
    City_ID: number;
    ShopQuantity: number;
  }
  
  export interface User {
    User_ID: number;
    Name: string;
    Email: string;
    Password: string;
    City_ID: number;
  }
  
  export interface Shop {
    Shop_ID: number;
    Name: string;
    Address: string;
    Area_ID: number;
  }
  
  export interface Product {
    Product_ID: number;
    Name: string;
    Price: number;
    Category_ID: number;
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
  