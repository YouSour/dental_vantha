/**
 * Index
 */
Template.clinic_patient.onRendered(function () {
    // Create new  alertify
    createNewAlertify("patient");
});

Template.clinic_patient.events({
    'click .insert': function (e, t) {

        alertify.patient(renderTemplate(Template.clinic_patientInsert))
            .set({
                title: fa("plus", "Patient")
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Clinic.Collection.Patient.findOne(this._id);

        alertify.patient(renderTemplate(Template.clinic_patientUpdate, data))
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

                    Clinic.Collection.Patient.remove(id, function (error) {
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

        alertify.alert(renderTemplate(Template.clinic_patientShow, this))
            .set({
                title: fa("eye", "Patient")
            });

    }
});

/**
 * Insert
 */
Template.clinic_patientInsert.onRendered(function () {
    datePicker();

});

Template.clinic_patientInsert.rendered = function () {
};

//Template.clinic_staffInsert.events({
//    'click .addressInsertAddon': function (e, t) {
//
//        alertify.addressAddon(renderTemplate(Template.sample_addressInsertAddon))
//            .set({
//                title: fa("plus", "Address")
//            });
//
//    }
//});

/**
 * Update
 */
Template.clinic_patientUpdate.onRendered(function () {
    datePicker();
});

//Template.sample_customerUpdate.events({
//    'click .addressInsertAddon': function (e, t) {
//
//        alertify.addressAddon(renderTemplate(Template.sample_addressInsertAddon))
//            .set({
//                title: fa("plus", "Address")
//            });
//
//    }
//});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    clinic_patientInsert: {
        before: {
            insert: function (doc) {
                var branchPre = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Patient, branchPre, 6);
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
    clinic_patientUpdate: {
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
    DateTimePicker.dateTime(memberDate);
};
