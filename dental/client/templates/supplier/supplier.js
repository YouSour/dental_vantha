/*
 * Index
 */

Template.clinic_supplier.onRendered(function () {
    createNewAlertify('supplier');
});

Template.clinic_supplier.events({
    'click .insert': function () {
        alertify.supplier(renderTemplate(Template.clinic_supplierInsert))
            .set({
                title: fa("plus", "Supplier")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Clinic.Collection.Supplier.findOne({_id: this._id});
        alertify.supplier(renderTemplate(Template.clinic_supplierUpdate, data))
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
                    Clinic.Collection.Supplier.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.clinic_supplierShow, this))
            .set({
                title: fa("eye", "Supplier")
            })
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    clinic_supplierInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Clinic.Collection.Supplier, 3);
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
    clinic_supplierUpdate: {
        onSuccess: function () {
            alertify.supplier().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});