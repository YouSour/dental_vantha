/*
 * Index
 */
Template.clinic_deposit.onRendered(function () {
    createNewAlertify('deposit');
});

Template.clinic_deposit.events({
    'click .insert': function () {
        alertify.deposit(renderTemplate(Template.clinic_depositInsert))
            .set({
                title: fa("plus", "Deposit")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Clinic.Collection.Deposit.findOne({_id: this._id});
        alertify.deposit(renderTemplate(Template.clinic_depositUpdate, data))
            .set({
                title: fa("pencil", "Deposit")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (result) {
                    Images.remove({_id: id});
                    Clinic.Collection.Deposit.remove(id, function (error) {
                        if (error) {
                            alertify.success(error.message);
                        } else {
                            alertify.success('Success');
                        }
                    })
                }
            })
    },
    'click .show': function () {
        alertify.alert(renderTemplate(Template.clinic_depositShow, this))
            .set({
                title: fa("eye", "Deposit")
            })
    }
});

/**
 * Insert
 */
Template.clinic_depositInsert.onRendered(function () {
    datepicker();
});

/**
 * Update
 */
Template.clinic_depositUpdate.onRendered(function () {
    datepicker();
});

/*
 *Hook
 */
AutoForm.hooks({
    clinic_depositInsert: {
        before: {
            insert: function (doc) {
                var registerId = doc.registerId + "-";
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Deposit, registerId, 2);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    clinic_depositUpdate: {
        onSuccess: function (formType, result) {
            alertify.deposit().close();
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    }
});

/*
 *Config date picker
 */
var datepicker = function () {
    var depositDate = $('[name="depositDate"]');
    DateTimePicker.dateTime(depositDate);
};