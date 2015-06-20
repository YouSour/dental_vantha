/*
 * Index
 */
Template.dental_deposit.onRendered(function () {
    createNewAlertify('deposit');
});

Template.dental_deposit.events({
    'click .insert': function () {
        alertify.deposit(renderTemplate(Template.dental_depositInsert))
            .set({
                title: fa("plus", "Deposit")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.Deposit.findOne({_id: this._id});
        alertify.deposit(renderTemplate(Template.dental_depositUpdate, data))
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
                    Files.remove({_id: id});
                    Dental.Collection.Deposit.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.dental_depositShow, this))
            .set({
                title: fa("eye", "Deposit")
            })
    }
});

/**
 * Insert
 */
Template.dental_depositInsert.onRendered(function () {
    datepicker();
});

/**
 * Update
 */
Template.dental_depositUpdate.onRendered(function () {
    datepicker();
});

/*
 *Hook
 */
AutoForm.hooks({
    dental_depositInsert: {
        before: {
            insert: function (doc) {
                var registerId = doc.registerId + "-";
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Deposit, registerId, 2);
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
    dental_depositUpdate: {
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