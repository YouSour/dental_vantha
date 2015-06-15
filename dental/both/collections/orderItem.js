/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.orderItem = new Mongo.Collection('clinic_orderItem');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.orderItem = new SimpleSchema({
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
                return Clinic.List.orderCategory();
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
Clinic.Collection.orderItem.attachSchema(Clinic.Schema.orderItem);