/**
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.Purchase = new Mongo.Collection('clinic_purchase');

/**
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.Purchase = new SimpleSchema({
    purchaseDate: {
        type: Date,
        label: "Purchase Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    supplierId: {
        type: String,
        label: "Supplier",
        max: 20,
        autoform: {
            type: "select2",
            options: function () {
                return Clinic.List.supplier();
            }
        }
    },
    registerId: {
        type: String,
        label: "Register ID",
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Clinic.List.register();
            }
        }
    },
    items: {
        label: "Items",
        type: Array,
        minCount: 1
    },
    'items.$': {
        type: Object
    },
    'items.$.orderItemId': {
        type: String,
        autoform: {
            //type: "select2",
            type: "selectize",
            options: function () {
                return Clinic.List.orderItem();
            }
        }
    },
    'items.$.qty': {
        type: Number,
        min:1
    },
    'items.$.price': {
        type: Number,
        decimal: true,
        min:1
    },
    'items.$.amount': {
        type: Number,
        decimal: true,
        optional:true
    },
    total: {
        type: Number,
        decimal: true,
        autoform: {
            afFieldInput: {
                type: "hidden"
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

Clinic.Collection.Purchase.attachSchema(Clinic.Schema.Purchase);