export interface ProductType {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  export interface CartItem extends ProductType {
    quantity: number;
  }