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
        alertify.patient(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert)).maximize();
    },
    'click .update': function (e, t) {
        var data = Dental.Collection.Patient.findOne({_id: this._id});

        var keys = [];
        for (var k in data.history[0]) keys.push(k);
        data.history = keys;

        debugger;
        alertify.patient(fa("pencil", "Patient"), renderTemplate(Template.dental_patientUpdate, data)).maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Patient"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {

                Dental.Collection.Patient.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .show': function (e, t) {
        var data = Dental.Collection.Patient.findOne(this._id);
        var history = [];
        _.each(data.history, function (val) {
            var historyDoc = Dental.Collection.DiseaseHistory.findOne(val);
            history.push(historyDoc.name);
        });
        data.historyVal = JSON.stringify(history, null, ' ');

        data.photoUrl = null;
        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        alertify.alert(fa("eye", "Patient"), renderTemplate(Template.dental_patientShow, data));
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