/**
 * Index
 */
Template.clinic_staff.onRendered(function () {
    // Create new  alertify
    createNewAlertify("staff");
});

Template.clinic_staff.events({
    'click .insert': function (e, t) {

        alertify.staff(renderTemplate(Template.clinic_staffInsert))
            .set({
                title: fa("plus", "Staff")
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Clinic.Collection.Staff.findOne(this._id);

        alertify.staff(renderTemplate(Template.clinic_staffUpdate, data))
            .set({
                title: fa("pencil", "Staff")
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Clinic.Collection.Staff.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Staff")
            });


    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.clinic_staffShow, this))
            .set({
                title: fa("eye", "Staff")
            });

    }
});

/**
 * Insert
 */
Template.clinic_staffInsert.onRendered(function () {
    datePicker();
});

Template.clinic_staffInsert.rendered = function () {
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
Template.clinic_staffUpdate.onRendered(function () {
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
 * Show
 */
Template.clinic_staffShow.helpers({
    formatStartDate: function () {
        return moment(this.startDate).format("YYYY-MM-DD");
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    clinic_staffInsert: {
        before: {
            insert: function (doc) {
                var branchPre = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Staff, branchPre, 4);
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
    clinic_staffUpdate: {
        onSuccess: function (formType, result) {
            alertify.staff().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
    //,
    // Address addon
    //sample_addressInsertAddon: {
    //    before: {
    //        insert: function (doc) {
    //            doc._id = idGenerator.gen(Sample.Collection.Address, 3);
    //            return doc;
    //        }
    //    },
    //    onSuccess: function (formType, result) {
    //        //alertify.addressAddon();
    //        alertify.success('Success');
    //    },
    //    onError: function (formType, error) {
    //        alertify.error(error.message);
    //    }
    //}
});

/**
 * Config date picker
 */
var datePicker = function () {
    var startDate = $('[name="startDate"]');
    DateTimePicker.date(startDate);
};
