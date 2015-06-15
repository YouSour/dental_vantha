/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.Supplier = new Mongo.Collection('clinic_supplier');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.Supplier = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    telephone: {
        type: String,
        max: 50
    },
    address: {
        type: String,
        max: 500
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
Clinic.Collection.Supplier.attachSchema(Clinic.Schema.Supplier);