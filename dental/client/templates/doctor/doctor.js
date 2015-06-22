/**
 * Index
 */
Template.dental_doctor.onCreated(function () {
    // Create new  alertify
    createNewAlertify("doctor");
});

Template.dental_doctor.events({
    'click .insert': function (e, t) {
        alertify.doctor(renderTemplate(Template.dental_doctorInsert))
            .set({
                title: fa("plus", "Doctor")
            })
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Dental.Collection.Doctor.findOne(this._id);

        alertify.doctor(renderTemplate(Template.dental_doctorUpdate, data))
            .set({
                title: fa("pencil", "Doctor")
            })
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    Dental.Collection.Doctor.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Doctor")
            });
    },
    'click .show': function (e, t) {
        var data = Dental.Collection.Doctor.findOne(this._id);
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }
        alertify.alert(renderTemplate(Template.dental_doctorShow, data))
            .set({
                title: fa("eye", "Doctor")
            });
    }
});

/**
 * Insert
 */
Template.dental_doctorInsert.onRendered(function () {
    datePicker();
});

Template.dental_doctorInsert.rendered = function () {
};

//Template.dental_doctorInsert.events({
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
Template.dental_doctorUpdate.onRendered(function () {
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
    dental_doctorInsert: {
        before: {
            insert: function (doc) {
                var branchPre = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Doctor, branchPre, 4);
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
    dental_doctorUpdate: {
        onSuccess: function (formType, result) {
            alertify.doctor().close();
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
    var startDate = $('[name="startDate"]');
    DateTimePicker.date(startDate);
};
