/**
 * Index
 */
Template.dental_orderItem.onRendered(function () {
    createNewAlertify(['orderItem','orderCategoryAddon']);
});

Template.dental_orderItem.events({
    'click .insert': function () {
        alertify.orderItem(fa("plus", "Order Item"), renderTemplate(Template.dental_orderItemInsert)).maximize();
    },
    'click .update': function () {
        var data = this;
        alertify.orderItem(fa("pencil", "Order Item"), renderTemplate(Template.dental_orderItemUpdate, data)).maximize();
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Remove"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.OrderItem.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .show': function () {
        var data = this;
        alertify.alert(fa("eye", "Order Item"), renderTemplate(Template.dental_orderItemShow, data));
    }
});

/*
 * Insert
 */
Template.dental_orderItemInsert.onCreated(function () {
  Meteor.subscribe('dental_orderCategory');
});
Template.dental_orderItemInsert.events({
    'click .orderCategoryAddon': function () {
       alertify.orderCategoryAddon(fa("plus","Order Category"),renderTemplate(Template.dental_orderCategoryInsert));
    }
});

/*
 * Update
 */
 Template.dental_orderItemUpdate.onCreated(function () {
   Meteor.subscribe('dental_orderCategory');
 });
Template.dental_orderItemUpdate.events({
    'click .orderCategoryAddon': function () {
        alertify.orderCategoryAddon(fa("pencil","Order Category"),renderTemplate(Template.dental_orderCategoryInsert));
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
            $('select').each(function(){
                $(this).select2("val","");
            });

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
