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
            })
            .maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.orderCategory.findOne({_id: this._id});
        alertify.orderCategory(renderTemplate(Template.dental_orderCategoryUpdate, data))
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
                    Dental.Collection.orderCategory.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.dental_orderCategoryShow, this))
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
                doc._id = idGenerator.gen(Dental.Collection.orderCategory, 3);
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
        onSuccess: function (fromType, result){
            alertify.orderCategory().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});