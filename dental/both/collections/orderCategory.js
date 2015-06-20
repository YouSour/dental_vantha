/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.orderCategory = new Mongo.Collection('dental_orderCategory');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.orderCategory = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    des: {
        type: String,
        max: 500,
        optional: true
    },
    createdDate: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        },
        denyUpdate: true
    },
    updatedDate: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    }
});

/**
 * attachSchema
 */
Dental.Collection.orderCategory.attachSchema(Dental.Schema.orderCategory);