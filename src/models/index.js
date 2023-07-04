// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "DELIVERED": "DELIVERED"
};

const { Basket, OrderDish, Order, BasketDish, User, Dish, Restaurant } = initSchema(schema);

export {
  Basket,
  OrderDish,
  Order,
  BasketDish,
  User,
  Dish,
  Restaurant,
  OrderStatus
};