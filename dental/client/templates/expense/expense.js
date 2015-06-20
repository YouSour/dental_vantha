/***
 * Index
 */
Template.dental_expense.onRendered(function () {
    createNewAlertify('expense');
});

Template.dental_expense.events({
    'click .insert': function () {
        alertify.expense(renderTemplate(Template.dental_expenseInsert))
            .set({
                title: fa("plus", "Expense")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.Expense.findOne({_id: this._id});
        alertify.expense(renderTemplate(Template.dental_expenseUpdate, data))
            .set({
                title: fa("pencil", "Expense")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (closeEvent) {
                    Dental.Collection.Expense.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Expense")
            })

    },
    'click .show': function () {
        alertify.alert(renderTemplate(Template.dental_expenseShow, this))
            .set({
                title: fa("eye", "Expense")
            })
    }
});

/**
 * Insert
 */
Template.dental_expenseInsert.onRendered(function () {
    datepicker();
});

Template.dental_expenseInsert.rendered = function () {

};

/**
 * update
 */
Template.dental_expenseUpdate.onRendered(function () {
    datepicker();
});

/**
 * Show
 */
Template.dental_expenseShow.helpers({
    formatExpenseDate: function () {
        return moment(this.expenseDate).format("YYYY-MM-DD");
    },
    formatExpenseTypeId: function () {
        var tempExpenseTypeId = Dental.Collection.expenseType.findOne({_id: this.expenseTypeId});
        return tempExpenseTypeId.name;
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_expenseInsert: {
        before: {
            insert: function (doc) {
                var branchPre = Session.get('currentBranch') + '-' + moment($('.expenseDate').val()).format("YYYYMMDD");
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Expense, branchPre, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error);
        }
    },
    dental_expenseUpdate: {
        onSuccess: function (formType, result) {
            alertify.expense().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/*
 * DatePicker
 */
var datepicker = function () {
    var expenseDate = $('[name="expenseDate"]');
    DateTimePicker.date(expenseDate);
};