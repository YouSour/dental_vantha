/*
 * Index
 */
Template.dental_treatment.onCreated(function () {
    createNewAlertify('doctorAddon');
});

Template.dental_treatment.helpers({
    selector: function () {

        console.log(Session.get('registerId'));

        return {registerId: Session.get('registerId')};
    }
});

Template.dental_treatment.events({
    //'click .insert': function () {
    //    alertify.treatment(renderTemplate(Template.dental_treatmentInsert))
    //        .set({
    //            title: fa("plus", "Treatment")
    //        })
    //        .maximize();
    //},
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
        var data = Dental.Collection.Treatment.findOne(this._id);
        //data.attachFileUrl = null;
        //
        //if (!_.isUndefined(data.attachFile)) {
        //    data.attachFileUrl = Files.findOne(data.attachFile).url();
        //}
        alertify.alert(renderTemplate(Template.dental_treatmentShow, data))
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

Template.dental_treatmentInsert.events({
    'change [name="patientId"]': function (e, t) {
        var patientId = t.$('[name="patientId"]').val();

        // Set list state
        Dental.ListState.set('patientId', patientId);
    },
    'change [name="registerId"]': function (e, t) {
        var registerId = t.$('[name="registerId"]').val();
        var treatmentDate = t.$('[name="treatmentDate"]');

        // Set treatment date
        if (!_.isEmpty(registerId)) {
            var registerDoc = Dental.Collection.Register.findOne(registerId);
            treatmentDate.data("DateTimePicker").minDate(registerDoc.registerDate);

            // Check last treatment
            var getLastTreatment = lastTreatment(registerId);
            if (!_.isUndefined(getLastTreatment)) {
                treatmentDate.data("DateTimePicker").minDate(getLastTreatment.treatmentDate);
            }
        }
    },
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(
            fa("plus", "Patient"),
            renderTemplate(Template.dental_patientInsert)
        ).maximize();
    },
    'click .registerAddon': function (e, t) {
        alertify.registerAddon(
            fa("plus", "Register"),
            renderTemplate(Template.dental_registerInsert)
        ).maximize();
    },
    'click .doctorAddon': function (e, t) {
        alertify.doctorAddon(
            fa("plus", "Doctor"),
            renderTemplate(Template.dental_staffInsert)
        ).maximize();
    }
});

/**
 * Update
 */
Template.dental_treatmentUpdate.onRendered(function () {
    datepicker();
});

Template.dental_treatmentUpdate.events({
    'change [name="patientId"]': function (e, t) {
        var patientId = t.$('[name="patientId"]').val();

        // Set list state
        Dental.ListState.set('patientId', patientId);
    },
    'change [name="registerId"]': function (e, t) {
        var registerId = t.$('[name="registerId"]').val();
        var treatmentDate = t.$('[name="treatmentDate"]');

        // Set treatment date
        if (!_.isEmpty(registerId)) {
            var registerDoc = Dental.Collection.Register.findOne(registerId);
            treatmentDate.data("DateTimePicker").minDate(registerDoc.registerDate);

            // Check last treatment
            var getLastTreatment = lastTreatment(registerId);
            if (!_.isUndefined(getLastTreatment)) {
                treatmentDate.data("DateTimePicker").minDate(getLastTreatment.treatmentDate);
            }
        }
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_treatmentInsert: {
        before: {
            insert: function (doc) {
                var currentBranch = Session.get('currentBranch');
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Treatment, currentBranch + '-', 12);
                doc.branchId = currentBranch;

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

/**
 * Config date picker
 */
var datepicker = function () {
    var treatmentDate = $('[name="treatmentDate"]');
    DateTimePicker.dateTime(treatmentDate);
};