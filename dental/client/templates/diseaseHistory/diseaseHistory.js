/*
 * Index
 */
Template.dental_diseaseHistory.onRendered(function () {
    createNewAlertify('diseaseHistory');
});

Template.dental_diseaseHistory.events({
    'click .insert': function () {
        alertify.diseaseHistory(fa("plus", "Disease History"), renderTemplate(Template.dental_diseaseHistoryInsert));
    },
    'click .update': function () {
        var data = Dental.Collection.DiseaseHistory.findOne({_id: this._id});
        alertify.diseaseHistory(fa("pencil", "Disease History"), renderTemplate(Template.dental_diseaseHistoryUpdate, data));
    },
    'click .remove': function () {
        var self = this;
        alertify.confirm(
            fa("remove", "Disease History"),
            "Are you sure to delete [" + self._id + "] ?",
            function () {
                Dental.Collection.DiseaseHistory.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success('Success');
                    }
                });
            },
            null
        );
    },
    'click .show': function () {
        alertify.alert(fa("eye","Disease History"),renderTemplate(Template.dental_diseaseHistoryShow,this));
    }
});

/*
 * Hook
 */

AutoForm.hooks({
    dental_diseaseHistoryInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Dental.Collection.DiseaseHistory, 3);

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
    dental_diseaseHistoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.diseaseHistory().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
