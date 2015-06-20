/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Deposit = new Mongo.Collection('dental_deposit');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Deposit = new SimpleSchema({
    depositDate: {
        type: String,
        label: "Deposit Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    registerId: {
        type: String,
        label: "Register ID",
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.register();
            }
        }
    },
    amount: {
        type: Number,
        decimal: true
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

Dental.Collection.Deposit.attachSchema(Dental.Schema.Deposit);