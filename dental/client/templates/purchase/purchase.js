/*
 *Index
 */
Template.clinic_purchase.onRendered(function () {
    createNewAlertify('purchase');
});

Template.clinic_purchase.events({
    'click .insert': function () {
        alertify.purchase(renderTemplate(Template.clinic_purchaseInsert))
            .set({
                title: fa("plus", "Purchase")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Clinic.Collection.Purchase.findOne({_id: this._id});
        alertify.purchase(renderTemplate(Template.clinic_purchaseUpdate, data))
            .set({
                title: fa("pencil", "Purchase")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (result) {
                    Clinic.Collection.Purchase.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success('Success');
                        }
                    });
                },
                title: fa("remove", "Purchase")
            })
    },
    'click .show': function () {
        alertify.alert(renderTemplate(Template.clinic_purchaseShow, this))
            .set({
                title: fa("eye", "Purchase")
            })
    }
});

/**
 * Insert
 */
Template.clinic_purchaseInsert.onRendered(function () {
    datepicker();
    $('.btnAdd').attr('disabled', "disabled");
});

Template.clinic_purchaseInsert.helpers({});

Template.clinic_purchaseInsert.events({
    'change .orderItemId': function (e) {

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
    'keyup .price ,.qty , click .price ,.qty ': function (e) {
        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();
        var amount = price * qty;
        thisObj.parents('div.row').find('.amount').val(amount);
        calculateTotal();


        if (price != 0 && qty != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }
    }

});

/**
 * Update
 */
Template.clinic_purchaseUpdate.onRendered(function () {
    datepicker();
    calculateTotal();
});

Template.clinic_purchaseUpdate.helpers({});

Template.clinic_purchaseUpdate.events({
    'change .orderItemId': function (e) {

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
        var thisObj = $(e.currentTarget);
        var orderItemId = $(e.currentTarget).val();
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();

        if (orderItemId != "" && price != 0 && qty != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'keyup .price ,.qty , click .price ,.qty ': function (e) {
        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();
        var amount = price * qty;
        thisObj.parents('div.row').find('.amount').val(amount);
        calculateTotal();

        if (price != 0 && qty != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }
    }

});

/**
 * Show
 */
Template.clinic_purchaseShow.helpers({
    purchaseDetailFormat: function () {
        var purchaseDetail = "";
        var data = this.items;
        data.forEach(function (obj) {
            purchaseDetail +=
                "OrderItem Id = " + obj.orderItemId +
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
    clinic_purchaseInsert: {
        before: {
            insert: function (doc) {
                var purchasePrefix = Session.get('currentBranch') + '-' + moment($('.purchaseDate').val()).format("YYYYMMDD");
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Purchase, purchasePrefix, 3);
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
    clinic_purchaseUpdate: {
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
