/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Payment = new Mongo.Collection('dental_payment');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Payment = new SimpleSchema({
    invoiceId: {
        type: String,
        label: 'Invoice ID',
        max: 25,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.invoice();
            }
        }
    },
    staffId: {
        type: String,
        label: 'Staff',
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.staff();
            }
        }
    },
    paymentDate: {
        type: String,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        },
        label: 'Payment Date'
    },
    dueAmount: {
        type: Number,
        decimal: true,
        label: 'Due Amount'
    },
    paidAmount: {
        type: Number,
        decimal: true,
        min: 1,
        label: 'Paid Amount'
    },
    balance: {
        type: Number,
        decimal: true,
        label: 'Balance'
    },
    status: {
        type: String,
        max: 50,
        optional: true
    }
});
/**
 * attachSchema
 */
Dental.Collection.Payment.attachSchema(Dental.Schema.Payment);