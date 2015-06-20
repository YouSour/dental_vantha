/**
 * Index
 */
Template.dental_diseaseCategory.onRendered(function () {
    // Create new  alertify
    createNewAlertify("diseaseCategory");
});

Template.dental_diseaseCategory.events({
    'click .insert': function (e, t) {
        alertify.DiseaseCategory(renderTemplate(Template.dental_diseaseCategoryInsert))
            .set({
                title: fa("plus", "Disease Category")
            });
    },
    'click .update': function (e, t) {
        var data = Dental.Collection.DiseaseCategory.findOne(this._id);

        alertify.DiseaseCategory(renderTemplate(Template.dental_diseaseCategoryUpdate, data))
            .set({
                title: fa("pencil", "Disease Category")
            });
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Dental.Collection.DiseaseCategory.remove(id, function (error) {
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
        var data = Dental.Collection.DiseaseCategory.findOne(this._id);

        alertify.alert(renderTemplate(Template.dental_diseaseCategoryShow, data))
            .set({
                title: fa("eye", "Disease Category")
            });
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_diseaseCategoryInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Dental.Collection.DiseaseCategory, 3);
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
    dental_diseaseCategoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.DiseaseCategory().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
