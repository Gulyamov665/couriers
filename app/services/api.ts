import { Order } from '../types/order'

export const getOrders = async (): Promise<Order[]> => {
  return [
    {
      id: 1,
      created_by: 'Иван Петров',
      total_price: '1500',
      status: 'new',
      created_at: '2025-04-25T12:00:00',
    },
    {
      id: 2,
      created_by: 'Анастасия Смирнова',

      total_price: "2300",
      status: 'delivered',
      created_at: '2025-04-24T18:30:00',
    },
    {
      id: 3,
      created_by: 'Алексей Воробьёв',

      total_price: "1800",
      status: 'cancelled',
      created_at: '2025-04-24T14:10:00',
    },
  ]
}
