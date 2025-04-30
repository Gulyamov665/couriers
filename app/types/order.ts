export type OrderStatus = 'new' | 'delivered' | 'cancelled';

export type RestaurantOrderType = {
  id: number;
  name: string;
  photo: string;
  address: string;
  phone: number;
};

type OrderProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  photo: string;
};
