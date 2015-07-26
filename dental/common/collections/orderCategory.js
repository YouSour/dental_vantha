/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.OrderCategory = new Mongo.Collection('dental_orderCategory');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.OrderCategory = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    des: {
        type: String,
        max: 500,
        optional: true
    }
});

/**
 * attachSchema
 */
Dental.Collection.OrderCategory.attachSchema(Dental.Schema.OrderCategory);