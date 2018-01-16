import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
type Query {
  reservation(id: ID!): Reservation
  allReservation: [Reservation]
  user(id: ID!): User
  category(id: ID!): Category
  item(id: ID!): Item
  action(id: ID!): Action
}
type Action {
  id: ID!
  user: User
  description: String
  time: String
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
type Discount {
  id: ID!
  name: String
  value: Float
}
type ReservationItem {
  id: ID!
  item: Item
  reservation: Reservation
}
type Item {
  id: ID!
  image: Image
  category: Category
  name: String
  price: Int
  active: Boolean
}
type Image {
  id: ID!
  main: String
  thumb: String
  description: String
}
type Category {
  id: ID!
  name: String
  parent: Category
  children: [Category]
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
type Admin {
  id: ID!
  password: String
  hash: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
