/*
 * Index
 */
Template.clinic_treatment.onRendered(function () {
    createNewAlertify('treatment');
});

Template.clinic_treatment.events({
    'click .insert': function () {
        alertify.treatment(renderTemplate(Template.clinic_treatmentInsert))
            .set({
                title: fa("plus", "Treatment")
            })
            .maximize();
    },
    'click .update': function () {
        var data = this;
        alertify.treatment(renderTemplate(Template.clinic_treatmentUpdate, data))
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
                    Clinic.Collection.Treatment.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.clinic_treatmentShow, this))
            .set({
                title: fa("eye", "Treatment")
            })
    }
});

/**
 * Insert
 */
Template.clinic_treatmentInsert.onRendered(function () {
    datepicker();
});

/**
 * Update
 */
Template.clinic_treatmentUpdate.onRendered(function () {
    datepicker();
});

/*
 * Show
 */
Template.clinic_treatmentShow.helpers({
    imageFormat: function () {
        var data = Images.findOne(this.attachFile);
        return new Spacebars.SafeString('<img src="' + data.url() + '" width="125px" class="img-responsive img-thumbnail" >');
    }
});

/*
 *Hook
 */
AutoForm.hooks({
    clinic_treatmentInsert: {
        before: {
            insert: function (doc) {
                var registerId = doc.registerId + "-";
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Treatment, registerId, 3);
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
    clinic_treatmentUpdate: {
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