/*
 *Index
 */
Template.dental_purchase.onRendered(function () {
    createNewAlertify(['purchase', 'supplierAddon', 'registerAddon']);
});


Template.dental_purchase.helpers({});

Template.dental_purchase.events({
    'click .insert': function () {
        alertify.purchase(fa("plus", "Purchase"), renderTemplate(Template.dental_purchaseInsert)).maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.Purchase.findOne({_id: this._id});
        alertify.purchase(fa("pencil", "Purchase"), renderTemplate(Template.dental_purchaseUpdate, data)).maximize();
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Purchase"),
            "Are you sure to delete [" + self._id + "] ?",
            function (result) {
                Dental.Collection.Purchase.remove(self._id, function (error) {
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
        alertify.alert(fa("eye", "Purchase"), renderTemplate(Template.dental_purchaseShow, this));
    }
});

/**
 * Insert
 */
Template.dental_purchaseInsert.onRendered(function () {
    datepicker();
    $('.btnAdd').attr('disabled', "disabled");
});

Template.dental_purchaseInsert.helpers({});

Template.dental_purchaseInsert.events({
    'click .supplierAddon': function () {
        alertify.supplierAddon(fa("plus", "Supplier"), renderTemplate(Template.dental_supplierInsert));
    },
    'click .registerAddon': function () {
        alertify.registerAddon(fa("plus", "Register"), renderTemplate(Template.dental_registerInsert)).maximize();
    },
    'change .orderItemId': function (e) {
        onChangeOrderItemId(e);
    },
    'click .btnRemove': function (e) {

        setTimeout(function () {
            var enable = true;
            $('.amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });

            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);

            }

            calculateTotal();
        }, 300);

    },
    'click .btnAdd': function (e) {

        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'keyup .price ,.qty , click .price ,.qty ': function (e) {
        checkEventKeyupAndClick(e);
    }

});

/**
 * Update
 */
Template.dental_purchaseUpdate.onRendered(function () {
    datepicker();
    calculateTotal();
});

Template.dental_purchaseUpdate.helpers({});

Template.dental_purchaseUpdate.events({
    'click .supplierAddon': function () {
        alertify.supplierAddon(fa("plus", "Supplier"), renderTemplate(Template.dental_supplierInsert));
    },
    'click .registerAddon': function () {
        alertify.registerAddon(fa("plus", "Register"), renderTemplate(Template.dental_registerInsert)).maximize();
    },
    'change .OrderItemId': function (e) {
        onChangeOrderItemId(e);
    },
    'click .btnRemove': function (e) {

        setTimeout(function () {
            var enable = true;
            $('.amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });

            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);

            }

            calculateTotal();
        }, 300);

    },
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'keyup .price ,.qty , click .price ,.qty ': function (e) {
        checkEventKeyupAndClick(e);
    }

});

/**
 * Show
 */
Template.dental_purchaseShow.helpers({
    purchaseDetailFormat: function () {
        var purchaseDetail = "";
        var data = this.items;
        data.forEach(function (obj) {
            purchaseDetail +=
                "OrderItem Id = " + obj.OrderItemId +
                ", Qty = " + obj.qty +
                ", Price = " + obj.price +
                ", Amount = " + obj.amount + "<br>";
        });

        return new Spacebars.SafeString(purchaseDetail);
    },
    purchaseDateFormat: function () {
        return moment(this.purchaseDate).format("YYYY-MM-DD");
    }
});
/**
 * Hook
 */
AutoForm.hooks({
    dental_purchaseInsert: {
        before: {
            insert: function (doc) {
                var purchasePrefix = Session.get('currentBranch') + '-' + moment($('.purchaseDate').val()).format("YYYYMMDD");
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Purchase, purchasePrefix, 3);
                doc.branchId = Session.get('currentBranch');
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
    dental_purchaseUpdate: {
        onSuccess: function () {
            alertify.purchase().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * onChange orderItemId
 */
function onChangeOrderItemId(e) {
    var thisObj = $(e.currentTarget);
    var orderItemId = $(e.currentTarget).val();
    var price = thisObj.parents('div.row').find('.price').val();
    var qty = thisObj.parents('div.row').find('.qty').val(1);
    var amount = thisObj.parents('div.row').find('.amount').val(price);

    if (orderItemId != "" && price != 0 && qty != 0) {
        $('.btnAdd').removeAttr('disabled');
    } else {
        $('.btnAdd').attr('disabled', "disabled");
    }
}

/**
 *
 */

function checkEventKeyupAndClick(e){
    var thisObj = $(e.currentTarget);
    var price = thisObj.parents('div.array-item').find('.price').val();
    var qty = thisObj.parents('div.array-item').find('.qty').val();
    var amount = price * qty;
    thisObj.parents('div.array-item').find('.amount').val(amount);
    calculateTotal();


    if (price != 0 && qty != 0) {
        $('.btnAdd').removeAttr('disabled');
    } else {
        $('.btnAdd').attr('disabled', "disabled");
    }
}

/**
 * Calculate all amount to total
 */
function calculateTotal() {
    var total = 0;
    $('.amount').each(function () {
        var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
        total += amount;
    });
    $('[name="total"]').val(total);

    var decimal_places = 2;
    var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10;

    $('.totalAmount')
        .animateNumber(
        {
            number: total * decimal_factor,

            numberStep: function (now, tween) {
                var floored_number = Math.floor(now) / decimal_factor,
                    target = $(tween.elem);

                if (decimal_places > 0) {
                    // force decimal places even if they are 0
                    floored_number = floored_number.toFixed(decimal_places);

                    // replace '.' separator with ','
                    floored_number = floored_number.toString().replace('.', ',');
                }

                target.text('$' + floored_number);
            }
        },
        200
    );
}

/*
 * Config date picker
 */

var datepicker = function () {
    var purchaseDate = $('[name="purchaseDate"]');
    DateTimePicker.date(purchaseDate);
};
