/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Register = new Mongo.Collection('dental_register');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Register = new SimpleSchema({
    patientId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.patient();
            }
        }
    },
    registerDate: {
        type: String,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    des: {
        type: String,
        label: "Description"
    },
    status: {
        type: String,
        optional: true
    },
    closingDate: {
        type: String,
        optional: true
    },
    disease: {
        type: Array,
        minCount: 0,
        optional: true
    },
    'disease.$': {
        type: Object
    },
    'disease.$.item': {
        type: String,
        autoform: {
            type: "selectize",
            options: function () {
                return Dental.List.diseaseItem();
            }
        }
    },
    'disease.$.qty': {
        type: Number,
        min: 1
    },
    'disease.$.price': {
        type: Number,
        decimal: true,
        min: 1
    },
    'disease.$.discount': {
        type: Number,
        min: 0,
        max: 100
    },
    'disease.$.amount': {
        type: Number,
        decimal: true
    },
    doctorShare: {
        type: Array,
        minCount: 0,
        label: "Income By Doctor",
        optional: true
    },
    'doctorShare.$': {
        type: Object
    },
    'doctorShare.$.doctor': {
        type: String,
        autoform: {
            //type: "select2",
            type: "selectize",
            options: function () {
                return Dental.List.doctor();
            }
        }
    },
    'doctorShare.$.amount': {
        type: Number,
        decimal: true,
        min: 0.01,
        custom: function () {
            if (this.value > this.field('total').value) {
                return "biggerThan";
            }
        }
    },
    doctorShareTotal: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    laboExpense: {
        type: Array,
        minCount: 0,
        label: "Laboratory Expense",
        optional: true
    },
    'laboExpense.$': {
        type: Object
    },
    'laboExpense.$.laboratory': {
        type: String,
        autoform: {
            //type: "select2",
            type: "selectize",
            options: function () {
                return Dental.List.laboratoryItem();
            }
        }
    },
    'laboExpense.$.amount': {
        type: Number,
        decimal: true,
        min: 0.01,
        custom: function () {
            if (this.value > this.field('total').value) {
                return "biggerThan";
            }
        }
    },
    laboExpenseTotal: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    subtotal: {
        type: Number,
        decimal: true
    },
    deposit: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    subDiscount: {
        type: Number,
        decimal: true,
        min: 0,
        max: 100,
        defaultValue: 0
    },
    total: {
        type: Number,
        decimal: true
    },
    branchId: {
        type: String
    }
});

/***
 *AttachSchema
 */
Dental.Collection.Register.attachSchema(Dental.Schema.Register);

/*
 * Custom Error Message
 */
SimpleSchema.messages({
    "biggerThan": "Amount Can't Bigger Than Total",
    "smallerThan": "Amount Can't Smaller Than Total"
});