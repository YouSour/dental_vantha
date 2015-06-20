/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.orderItem = new Mongo.Collection('dental_orderItem');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.orderItem = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    unit: {
        type: String,
        max: 250
    },
    orderCategoryId: {
        type: String,
        max: 5,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.orderCategory();
            }
        }
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
Dental.Collection.orderItem.attachSchema(Dental.Schema.orderItem);