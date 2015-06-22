/**
 * Index
 */
Template.dental_patient.onCreated(function () {
    // Create new  alertify
    createNewAlertify("patient");
});

Template.dental_patient.helpers({
    selector: function () {
        var pattern = Session.get('currentBranch');
        return {branchId: pattern};
    }
});

Template.dental_patient.events({
    'click .insert': function (e, t) {
        alertify.patient(renderTemplate(Template.dental_patientInsert))
            .set({
                title: fa("plus", "Patient")
            })
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Dental.Collection.Patient.findOne(this._id);

        alertify.patient(renderTemplate(Template.dental_patientUpdate, data))
            .set({
                title: fa("pencil", "Patient")
            })
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (closeEvent) {

                    Dental.Collection.Patient.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Patient")
            });
    },
    'click .show': function (e, t) {
        var data = Dental.Collection.Patient.findOne(this._id);
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        alertify.alert(renderTemplate(Template.dental_patientShow, data))
            .set({
                title: fa("eye", "Patient")
            });
    }
});

/**
 * Insert
 */
Template.dental_patientInsert.onRendered(function () {
    datePicker();
});

/**
 * Update
 */
Template.dental_patientUpdate.onRendered(function () {
    datePicker();
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_patientInsert: {
        before: {
            insert: function (doc) {
                var branchPre = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Patient, branchPre, 6);
                doc.branchId = Session.get('currentBranch');

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
    dental_patientUpdate: {
        onSuccess: function (formType, result) {
            alertify.patient().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * Config date picker
 */
var datePicker = function () {
    var memberDate = $('[name="memberDate"]');
    DateTimePicker.date(memberDate);
};
