/**
 * Index
 */
Template.dental_diseaseItem.onRendered(function () {
    // Create new  alertify
    createNewAlertify("diseaseItem");
});

Template.dental_diseaseItem.events({
    'click .insert': function (e, t) {
        alertify.diseaseItem(renderTemplate(Template.dental_diseaseItemInsert))
            .set({
                title: fa("plus", "Disease Item")
            })
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Dental.Collection.DiseaseItem.findOne(this._id);

        alertify.diseaseItem(renderTemplate(Template.dental_diseaseItemUpdate, data))
            .set({
                title: fa("pencil", "Disease Item")
            })
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    Dental.Collection.DiseaseItem.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Disease Item")
            });
    },
    'click .show': function (e, t) {
        var data = Dental.Collection.DiseaseItem.findOne(this._id);

        alertify.alert(renderTemplate(Template.dental_diseaseItemShow, data))
            .set({
                title: fa("eye", "Disease Item")
            });
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_diseaseItemInsert: {
        before: {
            insert: function (doc) {
                var categoryId = doc.diseaseCategoryId;

                doc._id = idGenerator.gen(Dental.Collection.DiseaseItem, 6);
                doc.code = categoryId + doc.code;

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
    dental_diseaseItemUpdate: {

        onSuccess: function (formType, result) {
            alertify.diseaseItem().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }

});


