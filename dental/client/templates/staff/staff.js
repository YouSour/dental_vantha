/**
 * Index
 */
Template.dental_staff.onRendered(function () {
    // Create new  alertify
    createNewAlertify("staff");
});

Template.dental_staff.events({
    'click .insert': function (e, t) {
        alertify.staff(renderTemplate(Template.dental_staffInsert))
            .set({
                title: fa("plus", "Staff")
            })
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Dental.Collection.Staff.findOne(this._id);

        alertify.staff(renderTemplate(Template.dental_staffUpdate, data))
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
                    Dental.Collection.Staff.remove(id, function (error) {
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
        var data = Dental.Collection.Staff.findOne(this._id);

        alertify.alert(renderTemplate(Template.dental_staffShow, data))
            .set({
                title: fa("eye", "Staff")
            });
    }
});

/**
 * Insert
 */
Template.dental_staffInsert.onRendered(function () {
    datePicker();
});

Template.dental_staffInsert.rendered = function () {
};

//Template.dental_staffInsert.events({
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
Template.dental_staffUpdate.onRendered(function () {
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
    dental_staffInsert: {
        before: {
            insert: function (doc) {
                var branchPre = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Staff, branchPre, 4);
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
    dental_staffUpdate: {
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
