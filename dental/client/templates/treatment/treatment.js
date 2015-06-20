/*
 * Index
 */
Template.dental_treatment.onRendered(function () {
    createNewAlertify('treatment');
});

Template.dental_treatment.events({
    'click .insert': function () {
        alertify.treatment(renderTemplate(Template.dental_treatmentInsert))
            .set({
                title: fa("plus", "Treatment")
            })
            .maximize();
    },
    'click .update': function () {
        var data = this;
        alertify.treatment(renderTemplate(Template.dental_treatmentUpdate, data))
            .set({
                title: fa("pencil", "Treatment")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (result, id) {
                    Dental.Collection.Treatment.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.dental_treatmentShow, this))
            .set({
                title: fa("eye", "Treatment")
            })
    }
});

/**
 * Insert
 */
Template.dental_treatmentInsert.onRendered(function () {
    datepicker();
});

/**
 * Update
 */
Template.dental_treatmentUpdate.onRendered(function () {
    datepicker();
});

/*
 * Show
 */
Template.dental_treatmentShow.helpers({
    imageFormat: function () {
        var data = Files.findOne(this.attachFile);
        return new Spacebars.SafeString('<img src="' + data.url() + '" width="125px" class="img-responsive img-thumbnail" >');
    }
});

/*
 *Hook
 */
AutoForm.hooks({
    dental_treatmentInsert: {
        before: {
            insert: function (doc) {
                var registerId = doc.registerId + "-";
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Treatment, registerId, 3);
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
    dental_treatmentUpdate: {
        onSuccess: function (formType, result) {
            alertify.treatment().close();
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
    var treatmentDate = $('[name="treatmentDate"]');
    DateTimePicker.dateTime(treatmentDate);
};