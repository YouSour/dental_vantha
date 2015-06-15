/***
 * Index
 */
Template.clinic_expense.onRendered(function () {
    createNewAlertify('expense');
});

Template.clinic_expense.events({
    'click .insert': function () {
        alertify.expense(renderTemplate(Template.clinic_expenseInsert))
            .set({
                title: fa("plus", "Expense")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Clinic.Collection.Expense.findOne({_id: this._id});
        alertify.expense(renderTemplate(Template.clinic_expenseUpdate, data))
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
                    Clinic.Collection.Expense.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.clinic_expenseShow, this))
            .set({
                title: fa("eye", "Expense")
            })
    }
});

/**
 * Insert
 */
Template.clinic_expenseInsert.onRendered(function () {
    datepicker();
});

Template.clinic_expenseInsert.rendered = function () {

};

/**
 * update
 */
Template.clinic_expenseUpdate.onRendered(function () {
    datepicker();
});

/**
 * Show
 */
Template.clinic_expenseShow.helpers({
    formatExpenseDate: function () {
        return moment(this.expenseDate).format("YYYY-MM-DD");
    },
    formatExpenseTypeId: function () {
        var tempExpenseTypeId = Clinic.Collection.expenseType.findOne({_id: this.expenseTypeId});
        return tempExpenseTypeId.name;
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    clinic_expenseInsert: {
        before: {
            insert: function (doc) {
                var branchPre = Session.get('currentBranch') + '-' + moment($('.expenseDate').val()).format("YYYYMMDD");
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Expense, branchPre, 3);
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
    clinic_expenseUpdate: {
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