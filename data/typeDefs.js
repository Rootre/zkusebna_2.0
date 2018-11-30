const typeDefs = `
type Query {
  actionById(id: ID!): Action
  allCategories: [Category]
  allDiscounts: [Discount]
  allItems: [Item]
  reservationsInRange(since: String!, until: String!): [Reservation]
  itemById(id: ID!): Item
  reservationById(id: ID!): Reservation
  userByCredentials(email: String!, phone: String!, name: String): User
  userById(id: ID!): User
}
type Mutation {
  createNewReservation(discount_id: ID!, name: String!, price: Int!, since: String!, until: String!, user_id: ID!): Reservation
  createReservationItems(items: [ReservationItemInput!]!): [ReservationItem]
  createNewUser(email: String!, phone: String!, name: String!): User
  updateItemName(id: ID!, name: String!): Item
  updateItemPrice(id: ID!, price: Int!): Item
}

input ReservationItemInput {
  item_id: ID
  reservation_id: ID    
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
  discount_id: ID
  user: User
  user_id: ID
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
  id: ID
  item_id: ID
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

export default typeDefs;
