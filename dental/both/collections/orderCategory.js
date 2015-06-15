/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.orderCategory = new Mongo.Collection('clinic_orderCategory');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.orderCategory = new SimpleSchema({
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
Clinic.Collection.orderCategory.attachSchema(Clinic.Schema.orderCategory);