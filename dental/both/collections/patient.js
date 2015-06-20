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
    branchId: {
        type: String,
        max: 25
    },
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 250
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.gender();
            }
        },
        max: 10
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
        max: 50
    },
    memberId: {
        type: String,
        label: "Member ID"
    },
    memberDate: {
        type: String,
        label: "Member Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    des: {
        type: String,
        label: "Description",
        optional: true,
        max: 50
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
 * Attach schema
 */
Dental.Collection.Patient.attachSchema(Dental.Schema.Patient);
