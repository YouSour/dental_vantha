/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.expenseType = new Mongo.Collection('dental_expenseType');

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.expenseType = new SimpleSchema({
    name: {
        type: String,
        max: 250,
        unique: true
    },
    des: {
        type: String,
        max: 500,
        optional:true
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
 * Attach schema
 */

Dental.Collection.expenseType.attachSchema(Dental.Schema.expenseType);