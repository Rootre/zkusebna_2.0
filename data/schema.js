import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
type Query {
  reservation(id: Int!): Reservation
  allReservation: [Reservation]
}
type Action {
  id: Int!
  user: User
  description: String
  time: String
}
type Reservation {
  id: Int!
  discount: Discount
  owner: User
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
  id: Int!
  name: String
  value: Float
  reservations: [Reservation]
}
type ReservationItem {
  id: Int!
  item: Item
  reservation: Reservation
}
type Item {
  id: Int!
  image: Image
  category: Category
  name: String
  price: Int
  active: Boolean
  reservationItems: [ReservationItem]
}
type Image {
  id: Int!
  main: String
  thumb: String
  description: String
}
type Category {
  id: Int!
  name: String
  parent: Category
  categories: [Category]
}
type User {
  id: Int!
  name: String
  phone: String
  email: String
  admin: Admin
  reservations: [Reservation]
  actions: [Action]
}
type Admin {
  id: Int!
  password: String
  hash: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
