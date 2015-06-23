Template.afArrayField_customArrayFieldInvoice.helpers({
    register: function () {
        var register = Dental.RegisterState.get('data');

        return register;
    }
});

Template.dental_invoiceTreatment.helpers({
    treatment: function () {
        var register = Dental.RegisterState.get('data');

        return register._treatment;
    }
});

/**
 * Insert
 */
Template.dental_invoiceInsert.onRendered(function () {
    datepicker();
    $('.btnAdd').attr('disabled', "disabled");
});

Template.dental_invoiceInsert.helpers({
    register: function () {
        var register = Dental.RegisterState.get('data');

        return register;
    }
});

Template.dental_invoiceInsert.events({
    'change .item': function (e, t) {
        var thisObj = $(e.currentTarget);
        var itemId = $(e.currentTarget).val();
        var qty, price, discount, amount;

        if (itemId != "") {
            var itemDoc = Dental.Collection.DiseaseItem.findOne({_id: itemId});

            qty = 1;
            price = math.round(itemDoc.price, 2);
            discount = 0;
            amount = math.round(qty * price, 2);

            $('.btnAdd').attr('disabled', false);
        }
        else {
            $('.btnAdd').attr('disabled', true);
        }

        thisObj.parents('div.array-item').find('.qty').val(qty);
        thisObj.parents('div.array-item').find('.price').val(price);
        thisObj.parents('div.array-item').find('.discount').val(discount);
        thisObj.parents('div.array-item').find('.amount').val(amount);

        // Cal footer
        calculateTotal();
    },
    'click .btnRemove': function (e, t) {
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

            // Cal footer
            calculateTotal();
        }, 300);

    },
    'keyup .qty,.discount, click .qty,.discount': function (e, t) {
        var thisObj = $(e.currentTarget);
        var qty = thisObj.parents('div.row').find('.qty').val();
        var price = thisObj.parents('div.row').find('.price').val();
        var discount = thisObj.parents('div.row').find('.discount').val();
        var amount = math.round(qty * price, 2);
        var amountAfterDiscount = math.round(amount - (amount * discount / 100), 2);

        thisObj.parents('div.row').find('.amount').val(amountAfterDiscount);

        if (qty > 0 && (discount >= 0 && discount <= 100)) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }

        // Cal footer
        calculateTotal();
    }
});


/**
 * Update
 */
Template.dental_invoiceUpdate.onRendered(function () {
    datepicker();

    // Cal footer
    calculateTotal();
});

Template.dental_invoiceUpdate.events({
    'change .item': function (e, t) {
        debugger;
        var thisObj = $(e.currentTarget);
        var itemId = $(e.currentTarget).val();
        var qty, price, discount, amount;

        if (itemId != "") {
            var itemDoc = Dental.Collection.DiseaseItem.findOne({_id: itemId});

            qty = 1;
            price = math.round(itemDoc.price, 2);
            discount = 0;
            amount = math.round(qty * price, 2);

            $('.btnAdd').attr('disabled', false);
        }
        else {
            $('.btnAdd').attr('disabled', true);
        }

        thisObj.parents('div.array-item').find('.qty').val(qty);
        thisObj.parents('div.array-item').find('.price').val(price);
        thisObj.parents('div.array-item').find('.discount').val(discount);
        thisObj.parents('div.array-item').find('.amount').val(amount);

        // Cal footer
        calculateTotal();
    },
    'click .btnRemove': function (e, t) {
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

            // Cal footer
            calculateTotal();
        }, 300);

    },
    'keyup .qty,.discount, click .qty,.discount': function (e, t) {
        var thisObj = $(e.currentTarget);
        var qty = thisObj.parents('div.row').find('.qty').val();
        var price = thisObj.parents('div.row').find('.price').val();
        var discount = thisObj.parents('div.row').find('.discount').val();
        var amount = math.round(qty * price, 2);
        var amountAfterDiscount = math.round(amount - (amount * discount / 100), 2);

        thisObj.parents('div.row').find('.amount').val(amountAfterDiscount);

        if (qty > 0 && (discount >= 0 && discount <= 100)) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }

        // Cal footer
        calculateTotal();
    },
    'click .remove': function () {
        var self = this;
        alertify.confirm(
            fa('remove', 'Invoice'),
            "Are you sure to delete [" + self._id + "] ?",
            function () {
                Dental.Collection.Invoice.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.invoiceAction().close();
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_invoiceInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch');

                doc._id = doc.registerId;
                //doc._id = idGenerator.genWithPrefix(Dental.Collection.Invoice, prefix  + "-", 9);
                doc.branchId = prefix;

                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.invoiceAction().close();
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    dental_invoiceUpdate: {
        onSuccess: function (formType, result) {
            alertify.invoiceAction().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * Config date picker
 */
var datepicker = function () {
    var invoiceDate = $('[name="invoiceDate"]');
    DateTimePicker.dateTime(invoiceDate);
};

/**
 * Calculate all amount to total
 */
function calculateTotal() {
    // Cal subtotal by items amount
    var subtotal = 0;
    $('.amount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        subtotal += amount;
    });

    // Set value on subtotal textbox
    $('[name="subtotal"]').val(subtotal);

    // Cal total after deposit
    var deposit = $('[name="deposit"]').val();
    var total = subtotal - deposit;

    // Set value on total textbox
    $('[name="total"]').val(total);

    // Set value on total animate
    var decimal_places = 2;
    var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10;
    $('.total')
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