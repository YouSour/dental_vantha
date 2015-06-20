/**
 * Index
 */
Template.dental_expenseType.onRendered(function () {
        createNewAlertify('expenseType');
    }
);

Template.dental_expenseType.events({
    'click .insert': function (e, t) {
        alertify.expenseType(renderTemplate(Template.dental_expenseTypeInsert))
            .set({
                title: fa("plus", "Expense Type")
            })
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Dental.Collection.expenseType.findOne({_id: this._id});
        alertify.expenseType(renderTemplate(Template.dental_expenseTypeUpdate, data))
            .set({
                title: fa("pencil", "Expense Type")
            })
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (closeEvent) {
                    Dental.Collection.expenseType.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title:fa("remove","Expense Type")
            })
    },
    'click .show': function (e, t) {
        alertify.alert(renderTemplate(Template.dental_expenseTypeShow,this))
            .set({
                title:fa("eye","Expense Type")
            })
    }
});

/*
 * Hook
 */

AutoForm.hooks({
    dental_expenseTypeInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Dental.Collection.expenseType, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_expenseTypeUpdate: {
        onSuccess: function (formType, result) {
            alertify.expenseType().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});