/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Invoice = new Mongo.Collection('dental_invoice');
Dental.Collection.shareInvoice = new Mongo.Collection('dental_shareInvoice');

Dental.Schema.Invoice = new SimpleSchema({
    invoiceDate: {
        type: String,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    type: {
        type: String,
        max: 50
    },
    registerId: {
        type: String,
        max: 20
    },
    depositId: {
        type: String,
        max: 25
    },
    diagnosis: {
        type: Array,
        label: "Diagnosis",
        minCount: 1
    },
    'diagnosis.$': {
        type: Object
    },
    'diagnosis.$.diagnosisId': {
        type: String,
        max: 20
    },
    'diagnosis.$.qty': {
        type: Number,
        min: 1
    },
    'diagnosis.$.price': {
        type: Number,
        decimal: true,
        min: 0
    },
    'diagnosis.$.amount': {
        type: Number,
        decimal: true
    },
    subTotal: {
        type: Number,
        decimal: true
    },
    total: {
        type: Number,
        decimal: true
    }

    //shareInvoice


});