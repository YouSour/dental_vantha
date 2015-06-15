/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.Staff = new Mongo.Collection("clinic_staff");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.Staff = new SimpleSchema({
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
                return Clinic.List.gender();
            }
        },
        max: 10
    },
    position: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Clinic.List.position();
            }
        },
        max: 50
    },
    startDate: {
        type: Date,
        label: "Register Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    address: {
        type: String,
        label: "Address",
        max: 500
    },
    telephone: {
        type: String,
        label: "Telephone",
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
Clinic.Collection.Staff.attachSchema(Clinic.Schema.Staff);
