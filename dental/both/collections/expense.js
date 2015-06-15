/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.Expense = new Mongo.Collection('clinic_expense');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.Expense = new SimpleSchema({
    expenseDate: {
        type: Date,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    expenseTypeId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Clinic.List.expenseType();
            }
        }
    },
    amount: {
        type: Number,
        decimal: true
    },
    des: {
        type: String,
        max: 500,
        optional: true
    },
    createdDate: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    updatedDate: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    }
});

/***
 * AttachSchema
 */
Clinic.Collection.Expense.attachSchema(Clinic.Schema.Expense);
