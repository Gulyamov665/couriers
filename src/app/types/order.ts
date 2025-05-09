export type OrderStatus = 'new' | 'delivered' | 'cancelled';

export type RestaurantOrderType = {
  id: number;
  name: string;
  photo: string;
  address: string;
  phone: number;
};
