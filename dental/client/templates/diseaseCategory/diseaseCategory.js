/**
 * Index
 */
Template.clinic_diseaseCategory.onRendered(function () {
    // Create new  alertify
    createNewAlertify("diseaseCategory");
});

Template.clinic_diseaseCategory.events({
    'click .insert': function (e, t) {

        alertify.diseaseCategory(renderTemplate(Template.clinic_diseaseCategoryInsert))
            .set({
                title: fa("plus", "Disease Category")
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Clinic.Collection.diseaseCategory.findOne(this._id);

        alertify.diseaseCategory(renderTemplate(Template.clinic_diseaseCategoryUpdate, data))
            .set({
                title: fa("pencil", "Disease Category")
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Clinic.Collection.diseaseCategory.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Disease Category")
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.clinic_diseaseCategoryShow, this))
            .set({
                title: fa("eye", "Disease Category")
            });
    }
});

/**
 * Hook
 */
AutoForm.hooks({

    clinic_diseaseCategoryInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Clinic.Collection.diseaseCategory, 3);
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
    clinic_diseaseCategoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.diseaseCategory().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }

});
