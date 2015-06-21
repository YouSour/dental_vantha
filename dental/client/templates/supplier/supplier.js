/*
 * Index
 */
Template.dental_supplier.onRendered(function () {
    createNewAlertify('supplier');
});

Template.dental_supplier.events({
    'click .insert': function () {
        alertify.supplier(renderTemplate(Template.dental_supplierInsert))
            .set({
                title: fa("plus", "Supplier")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.Supplier.findOne({_id: this._id});
        alertify.supplier(renderTemplate(Template.dental_supplierUpdate, data))
            .set({
                title: fa("pencil", "Supplier")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (closeEvent) {
                    Dental.Collection.Supplier.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.dental_supplierShow, this))
            .set({
                title: fa("eye", "Supplier")
            })
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_supplierInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Dental.Collection.Supplier, 3);
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
    dental_supplierUpdate: {
        onSuccess: function () {
            alertify.supplier().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});