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
    patientId:{
        type: String,
        label: 'Patient',
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.patient();
            }
        }
    },
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
        custom: function () {
            if (this.value < moment().format('YYYY-MM-DD')) {
                return "date";
            }
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
        min: 0,
        custom: function () {
            if (this.value > this.field('dueAmount').value) {
                return "biggerThan";
            }
        },
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
    },
    branchId: {
        type: String
    }
});

/**
 * attachSchema
 */
Dental.Collection.Payment.attachSchema(Dental.Schema.Payment);

/*
 * Custom Error Message
 */
SimpleSchema.messages({
    "biggerThan": "Paid Amount Can't Bigger Than Due Amount",
    "date": "Payment Date Can't Smaller Than " + moment().format('YYYY-MM-DD H:mm:ss')
});
