type OrderProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  photo: string;
};

export type RestaurantOrderType = {
  id: number;
  name: string;
  photo: string;
  address: string;
  phone: number;
};

export type UserLocationType = {
  lat: string;
  long: string;
  house?: string;
  apartment?: string;
  floor?: string;
  entrance?: string;
  address: string;
  comment?: string;
  name?: string;
  is_active?: boolean;
  street?: string;
  user: number;
};

export type DistanceResult = {
  distance: string;
  duration: string;
};

export type OrdersType = {
  id: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  total_price: string;
  lat: string;
  long: string;
  user_id: number;
  restaurant: RestaurantOrderType;
  products: OrderProduct[];
  status: string;
  location: UserLocationType;
  destination?: DistanceResult;
};

export type OrdersData = {
  data: OrdersType[];
  last_page: number;
  page: number;
  total: number;
};

export type UserInfoType = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  avatar?: null;
  user_registered_at: string;
  is_active: boolean;
  is_user: boolean;
  is_vendor: boolean;
  location: UserLocationType;
};
