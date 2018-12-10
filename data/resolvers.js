import {Discount, Reservation, ReservationItem, Item, User, Admin, Category, Action, Image} from './connectors';
import {GraphQLScalarType} from 'graphql';
import moment from 'moment';
import {Op} from 'sequelize';

import {getDatabaseTimeFromMoment} from '../helpers/dates.js';

const resolvers = {
    Query: {
        actionById(_, {id}) {
            return Action.findById(id);
        },
        allCategories() {
            return Category.findAll();
        },
        allDiscounts() {
            return Discount.findAll();
        },
        allItems() {
            return Item.findAll();
        },
        reservationsInRange(_, {since, until}) {
            return Reservation.findAll({
                where: {
                    [Op.or]: [
                        {
                            since: {
                                [Op.gt]: since,
                                [Op.lt]: until,
                            },
                        },
                        {
                            until: {
                                [Op.gt]: since,
                                [Op.lt]: until,
                            },
                        },
                        {
                            since: {
                                [Op.lt]: since,
                            },
                            until: {
                                [Op.gt]: until,
                            },
                        },
                    ]
                }
            });
        },
        itemById(_, {id}) {
            return Item.findById(id);
        },
        reservationById(_, {id}) {
            return Reservation.findById(id);
        },
        userByCredentials(_, {email, phone, name}) {
            return User.find({
                where: {
                    email,
                    phone,
                    name,
                }
            });
        },
        userById(_, {id}) {
            return User.findById(id);
        },
    },
    Mutation: {
        createNewReservation(_, args, foo) {
            return Reservation.create(args);
        },
        createNewUser(_, args) {
            return User.create(args);
        },
        createReservationItems(_, {items}) {
            return ReservationItem.bulkCreate(items);
        },
        updateItemName(_, {id, name}) {
            return Item.update({name}, {where: {id}})
        },
        updateItemPrice(_, {id, price}) {
            return Item.update({price}, {where: {id}})
        },
    },


    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return value; // value from the client
        },
        serialize(value) {
            return getDatabaseTimeFromMoment(moment(value)); // value sent to the client
        },
        parseLiteral(ast) {
            return ast.value;
        },
    }),


    Action: {
        user(action) {
            return User.findById(action.user_id)
        }
    },
    Category: {
        children(category) {
            return Category.findAll({where: {category_id: category.id}})
        },
        items(category) {
            return Item.findAll({where: {category_id: category.id}})
        },
        parent(category) {
            return Category.findById(category.category_id)
        }
    },
    Item: {
        category(item) {
            return Category.findById(item.category_id)
        },
        image(item) {
            return Image.findById(item.image_id)
        }
    },
    Reservation: {
        discount(reservation) {
            return Discount.find({where: {id: reservation.discount_id}})
        },
        user(reservation) {
            return User.find({where: {id: reservation.user_id}})
        },
        reservationItems(reservation) {
            return ReservationItem.findAll({
                where: {reservation_id: reservation.id},
                include: [Reservation, Item],
            })
        },
    },
    ReservationItem: {
        item(reservation_item) {
            return reservation_item.item
        },
        reservation(reservation_item) {
            return reservation_item.reservation
        }
    },
    User: {
        actions(user) {
            return Action.findAll({where: {user_id: user.id}})
        },
        admin(user) {
            return Admin.findById(user.admin_id)
        },
        reservations(user) {
            return Reservation.findAll({where: {user_id: user.id}})
        },
    },
};

export default resolvers;