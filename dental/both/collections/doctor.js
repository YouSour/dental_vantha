/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Doctor = new Mongo.Collection("dental_doctor");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Doctor = new SimpleSchema({
    name: {
        type: String,
        unique: true,
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
    startDate: {
        type: String,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        }
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
    des: {
        type: String,
        label: 'Description',
        max: 500,
        optional: true
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
Dental.Collection.Doctor.attachSchema(Dental.Schema.Doctor);