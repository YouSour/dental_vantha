/*
 * Index
 */
Template.dental_orderCategory.onRendered(function () {
    createNewAlertify('orderCategory');
});

Template.dental_orderCategory.events({
    'click .insert': function () {
        alertify.orderCategory(renderTemplate(Template.dental_orderCategoryInsert))
            .set({
                title: fa("plus", "Order Category")
            });
    },
    'click .update': function () {
        var data = Dental.Collection.OrderCategory.findOne({_id: this._id});
        alertify.orderCategory(renderTemplate(Template.dental_orderCategoryUpdate, data))
            .set({
                title: fa("pencil", "Order Category")
            });
    },
    'click .remove': function () {
        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (closeEvent) {
                    Dental.Collection.OrderCategory.remove(id, function (error) {
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
        var data = Dental.Collection.OrderCategory.findOne({_id: this._id});

        alertify.alert(renderTemplate(Template.dental_orderCategoryShow, data))
            .set({
                title: fa("eye", "Order Category")
            })
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_orderCategoryInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Dental.Collection.OrderCategory, 3);
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
    dental_orderCategoryUpdate: {
        onSuccess: function (fromType, result) {
            alertify.orderCategory().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});