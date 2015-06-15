/**
 * Index
 */
Template.clinic_disease.onRendered(function () {
    // Create new  alertify
    createNewAlertify("disease");
});

Template.clinic_disease.events({
    'click .insert': function (e, t) {

        alertify.disease(renderTemplate(Template.clinic_diseaseInsert))
            .set({
                title: fa("plus", "Disease")
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Clinic.Collection.Disease.findOne(this._id);

        alertify.disease(renderTemplate(Template.clinic_diseaseUpdate, data))
            .set({
                title: fa("pencil", "Disease")
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Clinic.Collection.Disease.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Disease")
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.clinic_diseaseShow, this))
            .set({
                title: fa("eye", "Disease")
            });

    }
});

/**
 * Show
 */
Template.clinic_diseaseShow.helpers({
    formatDeseaseCategoryId: function () {
        var tempDiseaseCategory= Clinic.Collection.diseaseCategory.findOne({_id:this.diseaseCategoryId});
        return tempDiseaseCategory.name;
    }

});

/**
 * Hook
 */
AutoForm.hooks({
    clinic_diseaseInsert: {
        before: {
            insert: function (doc) {
                var tempDiseaseCategory = Clinic.Collection.diseaseCategory.findOne({_id: $('[name="diseaseCategoryId"]').val()});
                var diseaseCategory = tempDiseaseCategory._id + "-";
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Disease, diseaseCategory, 4);
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
    clinic_diseaseUpdate: {

        onSuccess: function (formType, result) {
            alertify.disease().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }

});


