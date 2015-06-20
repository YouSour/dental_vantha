/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Staff = new Mongo.Collection("dental_staff");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Staff = new SimpleSchema({
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
    position: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.position();
            }
        }
    },
    registerDate: {
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
    },
    branchId: {
        type: String
    }
});

/**
 * Attach schema
 */
Dental.Collection.Staff.attachSchema(Dental.Schema.Staff);
