/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.expenseType = new Mongo.Collection('clinic_expenseType');

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.expenseType = new SimpleSchema({
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

Clinic.Collection.expenseType.attachSchema(Clinic.Schema.expenseType);