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
        var data = Dental.Collection.orderItem.findOne({_id: this._id});
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
                    Dental.Collection.orderItem.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.dental_orderItemShow, this))
            .set({
                title: fa("eye", "Order Item")
            })
    }
});

/*
 * Show
 */
Template.dental_orderItemShow.helpers({
    formatOrderCategoryId: function () {
        var tempOrderCategory = Dental.Collection.orderCategory.findOne({_id:this.orderCategoryId});
        return tempOrderCategory.name;
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_orderItemInsert: {
        before: {
            insert: function (doc) {
                var tempOrderCategoty = Dental.Collection.orderCategory.findOne({_id: $('[name="orderCategoryId"]').val()});
                var orderCategory = tempOrderCategoty._id + "-";
                doc._id = idGenerator.genWithPrefix(Dental.Collection.orderItem, orderCategory, 3);
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
