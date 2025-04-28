export type OrderStatus = 'new' | 'delivered' | 'cancelled'

export type RestaurantOrderType = {
  id: number
  name: string
  photo: string
  address: string
  phone: number
}

type OrderProduct = {
  id: number
  name: string
  price: number
  quantity: number
  photo: string
}
export interface Order {
  id: number
  created_at: string
  updated_at?: string
  created_by: string | null
  total_price: string
  lat?: string
  long?: string
  user_id?: number
  restaurant?: RestaurantOrderType
  products?: OrderProduct[]
  status: string
}
