/*
 * Index
 */

Template.clinic_orderCategory.onRendered(function () {
    createNewAlertify('orderCategory');
});

Template.clinic_orderCategory.events({
    'click .insert': function () {
        alertify.orderCategory(renderTemplate(Template.clinic_orderCategoryInsert))
            .set({
                title: fa("plus", "Order Category")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Clinic.Collection.orderCategory.findOne({_id: this._id});
        alertify.orderCategory(renderTemplate(Template.clinic_orderCategoryUpdate, data))
            .set({
                title: fa("pencil", "Order Category")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (closeEvent) {
                    Clinic.Collection.orderCategory.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Remove")
            })
    },
    'click .show': function () {
        alertify.alert(renderTemplate(Template.clinic_orderCategoryShow, this))
            .set({
                title: fa("eye", "Order Category")
            })
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    clinic_orderCategoryInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Clinic.Collection.orderCategory, 3);
                return doc;
            }
        },
        onSuccess: function (fromType, result) {
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    clinic_orderCategoryUpdate: {
        onSuccess: function (fromType, result){
            alertify.orderCategory().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});