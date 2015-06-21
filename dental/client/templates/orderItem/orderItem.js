/**
 * Index
 */
Template.dental_orderItem.onRendered(function () {
    createNewAlertify('orderItem');
});

Template.dental_orderItem.events({
    'click .insert': function () {
        alertify.orderItem(renderTemplate(Template.dental_orderItemInsert))
            .set({
                title: fa("plus", "Order Item")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.OrderItem.findOne({_id: this._id});
        alertify.orderItem(renderTemplate(Template.dental_orderItemUpdate, data))
            .set({
                title: fa("pencil", "Order Item")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (closeEvent) {
                    Dental.Collection.OrderItem.remove(id, function (error) {
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
        var data = Dental.Collection.OrderItem.findOne({_id: this._id});

        alertify.alert(renderTemplate(Template.dental_orderItemShow, data))
            .set({
                title: fa("eye", "Order Item")
            })
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_orderItemInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Dental.Collection.OrderItem, 6);
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
    dental_orderItemUpdate: {
        onSuccess: function (fromType, result) {
            alertify.orderItem().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
