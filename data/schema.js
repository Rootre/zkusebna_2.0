import {makeExecutableSchema} from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
type Query {
  actionById(id: ID!): Action
  allCategories: [Category]
  allDiscounts: [Discount]
  allItems: [Item]
  calendarReservationsForRange(since: String!, until: String!): [Reservation]
  itemById(id: ID!): Item
  reservationById(id: ID!): Reservation
  reservedItemsForRange(since: String!, until: String!): [Item]
  userById(id: ID!): User
}
type Mutation {
  updateItemName(id: ID!, name: String!): Item
  updateItemPrice(id: ID!, price: Int!): Item
}

type Action {
  id: ID!
  user: User
  description: String
  time: String
}
type Admin {
  id: ID!
  password: String
  hash: String
}
type Category {
  id: ID!
  name: String
  category_id: Int
  parent: Category
  children: [Category]
  items: [Item]
}
type Discount {
  id: ID!
  name: String
  value: Float
}
type Image {
  id: ID!
  main: String
  thumb: String
  description: String
}
type Item {
  id: ID!
  image: Image
  category_id: Int
  category: Category
  name: String
  price: Int
  active: Boolean
}
type Reservation {
  id: ID!
  discount: Discount
  user: User
  approved: Boolean
  archived: Boolean
  since: String
  until: String
  price: Int
  name: String
  repeated: Int
  reservationItems: [ReservationItem]
}
type ReservationItem {
  id: ID!
  item: Item
  reservation: Reservation
}
type User {
  id: ID!
  name: String
  phone: String
  email: String
  admin: Admin
  reservations: [Reservation]
  actions: [Action]
}
`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
