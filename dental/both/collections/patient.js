/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Patient = new Mongo.Collection("dental_patient");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Patient = new SimpleSchema({
    name: {
        type: String,
        max: 250
    },
    gender: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.gender();
            }
        }
    },
    age: {
        type: Number,
        max: 110,
        min: 1
    },
    address: {
        type: String,
        max: 500
    },
    telephone: {
        type: String,
        max: 50,
        optional: true
    },
    memberId: {
        type: String,
        max: 50,
        optional: true
    },
    memberDate: {
        type: String,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        },
        optional: true
    },
    des: {
        type: String,
        label: "Description",
        optional: true,
        max: 500
    },
    photo: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        },
        optional: true
    },
    branchId: {
        type: String
    }
});

/**
 * Attach schema
 */
Dental.Collection.Patient.attachSchema(Dental.Schema.Patient);
