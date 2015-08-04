Template.afArrayField_customArrayFieldInvoiceForDiseaseItem.helpers({
    register: function () {
        var register = Dental.RegisterState.get('data');

        return register;
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

        // Treatment attach file
        var treatment = [];
        register._treatment.forEach(function (obj) {
            obj.attachFileUrl = null;
            if (!_.isUndefined(obj.attachFile)) {
                obj.attachFileUrl = Files.findOne(obj.attachFile).url();
            }

            treatment.push(obj);
        });

        register._treatment = treatment;

        return register;
    }
});

Template.dental_invoiceInsert.events({
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'click .saveAndPrint': function () {
      Session.set('printInvoice',true);
    }
});

/**
 * Update
 */
Template.dental_invoiceUpdate.onRendered(function () {
    datepicker();
});

Template.dental_invoiceUpdate.helpers({
    register: function () {
        var register = Dental.RegisterState.get('data');

        // Treatment attach file
        var treatment = [];
        register._treatment.forEach(function (obj) {
            obj.attachFileUrl = null;
            if (!_.isUndefined(obj.attachFile)) {
                obj.attachFileUrl = Files.findOne(obj.attachFile).url();
            }

            treatment.push(obj);
        });

        register._treatment = treatment;

        return register;
    }
});

Template.dental_invoiceUpdate.events({
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
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
 * Disease Item
 */
Template.afArrayField_customArrayFieldInvoiceForDiseaseItem.events({
    'change .item': function (e, t) {
        var thisObj = $(e.currentTarget);
        var itemId = $(e.currentTarget).val();

        var qty, price, discount, amount;

        if (itemId != "") {
            var itemDoc = Dental.Collection.DiseaseItem.findOne({_id: itemId});
            var checkingMemberPrice = Dental.Collection.Patient.findOne({_id: $('[name="patientId"]').val()}, {member: "Yes"});
            qty = 1;

            if (checkingMemberPrice.member == "Yes") {
                price = math.round(itemDoc.memberPrice, 2);
            } else {
                price = math.round(itemDoc.price, 2);
            }
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

        CalculateTotalAndAmount(e);
        // Cal footer
        calculateTotal();
    },
    'keyup [name="subDiscount"]': function (e, t) {
        // Cal footer
        calculateTotal();
    }
});


/**
 * Doctor Share
 */
Template.afArrayField_customArrayFieldInvoiceForDoctorShare.events({
    'click .btnRemoveForDoctorShare': function (e, t) {
        setTimeout(function () {
            var enable = true;
            $('.doctor-share-amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });

            // Cal footer for doc share
            calculateTotalForDoctorShare();
        }, 300);
    },
    'keyup .doctor-share-amount': function (e, t) {
        // Cal footer for doc share
        calculateTotalForDoctorShare();
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

            var printSession=Session.get('printInvoice');
            var data=Dental.Collection.Register.findOne(result);
            if(printSession){
                var q = 'patient=' + data.patientId + '&register=' + data._id;
                var url = '/dental/invoiceReportGen?' + q;
                window.open(url);
            }
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
 * Calculate total & Amount for disease item When keyUp & click
 */

function CalculateTotalAndAmount(e) {
    var thisObj = $(e.currentTarget);
    var qty = thisObj.parents('div.array-item').find('.qty').val();
    var price = thisObj.parents('div.array-item').find('.price').val();
    var discount = thisObj.parents('div.array-item').find('.discount').val();
    var amount = math.round(qty * price, 2);
    var amountAfterDiscount = math.round(amount - (amount * discount / 100), 2);

    thisObj.parents('div.array-item').find('.amount').val(amountAfterDiscount);

    if (qty > 0 && (discount >= 0 && discount <= 100)) {
        $('.btnAdd').removeAttr('disabled');
    } else {
        $('.btnAdd').attr('disabled', "disabled");
    }
}

/**
 * Calculate total for disease items
 */
function calculateTotal() {
    // Cal subtotal by items amount
    var subtotal = math.round(0, 2);
    $('.amount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        subtotal += amount;
    });

    // Set value on subtotal textbox
    $('[name="subtotal"]').val(subtotal);

    // Cal total after deposit and sub discount
    var deposit = _.isEmpty($('[name="deposit"]').val()) ? 0 : parseFloat($('[name="deposit"]').val());
    var subDiscount = _.isEmpty($('[name="subDiscount"]').val()) ? 0 : parseFloat($('[name="subDiscount"]').val());

    subDiscount = math.round((subtotal - deposit) - subDiscount, 2);

    var total = math.round(subDiscount, 2);


    // Set value on total
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

/**
 * Calculate total for doctor share
 */
function calculateTotalForDoctorShare() {
    // Cal subtotal by items amount
    var totalForDoctorShare = 0;

    $('.doctor-share-amount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        totalForDoctorShare += amount;
    });

    // Set value on subtotal textbox
    $('[name="doctorShareTotal"]').val(totalForDoctorShare);
}
