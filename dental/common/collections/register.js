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
            type: "select",
            //type: "selectize",
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
    total: {
        type: Number,
        decimal: true,
        autoform: {
            afFieldInput: {
                type: "hidden"
            }
        },
        optional: true
    },
    des: {
        type: String,
        label: "Description"
    },
    branchId: {
        type: String
    }
});

/***
 *AttachSchema
 */
Dental.Collection.Register.attachSchema(Dental.Schema.Register);