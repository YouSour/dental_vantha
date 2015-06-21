/***
 * Index
 */
Template.dental_register.onRendered(function () {
    createNewAlertify(['register', 'patientAddon']);
});

Template.dental_register.events({
    'click .insert': function () {
        alertify.register(renderTemplate(Template.dental_registerInsert))
            .set({
                title: fa("plus", "Register")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.Register.findOne({_id: this._id});

        alertify.register(renderTemplate(Template.dental_registerUpdate, data))
            .set({
                title: fa("pencil", "Register")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (result) {
                    Dental.Collection.Register.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                }

            })
    },
    'click .show': function () {
        var data = Dental.Collection.Register.findOne({_id: this._id});

        alertify.alert(renderTemplate(Template.dental_registerShow, data))
            .set({
                title: fa("eye", "Register")
            })
    }
});

/**
 * Insert
 */
Template.dental_registerInsert.onRendered(function () {
    datepicker();
    $('.btnAdd').attr('disabled', "disabled");
});

Template.dental_registerInsert.helpers({});

Template.dental_registerInsert.events({
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert));
    },
    'change .item': function (e, t) {
        var thisObj = $(e.currentTarget);
        var itemId = $(e.currentTarget).val();
        var qty, price, discount, amount;

        if (itemId != "") {
            var itemDoc = Dental.Collection.DiseaseItem.findOne({_id: itemId});

            qty = 1;
            price = itemDoc.price;
            discount = 0;
            amount = qty * price;

            $('.btnAdd').attr('disabled', false);
        }
        else {
            $('.btnAdd').attr('disabled', true);
        }

        thisObj.parents('div.row').find('.qty').val(qty);
        thisObj.parents('div.row').find('.price').val(price);
        thisObj.parents('div.row').find('.discount').val(discount);
        thisObj.parents('div.row').find('.amount').val(amount);

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

        calculateTotal();
    }
});


/**
 * Update
 */
Template.dental_registerUpdate.onRendered(function () {
    datepicker();

    //run this function when on update get value for total
    calculateTotal();
});

Template.dental_registerUpdate.helpers({});

Template.dental_registerUpdate.events({
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert));
    },
    'change .diagnosisId': function (e) {

        var thisObj = $(e.currentTarget);
        var diagnosisId = $(e.currentTarget).val();
        if (diagnosisId != "") {
            var dataDiagnosis = Dental.Collection.Disease.findOne({_id: diagnosisId});
            $('.btnAdd').attr('disabled', false);
        }
        else {
            $('.btnAdd').attr('disabled', true);
        }

        var price = dataDiagnosis.price;
        thisObj.parents('div.row').find('.price').val(price);
        thisObj.parents('div.row').find('.qty').val(1);
        thisObj.parents('div.row').find('.discount').val(0);
        thisObj.parents('div.row').find('.amount').val(price);

        calculateTotal();
    },

    'click .btnRemove': function (e) {

        alert(e.currentTarget.val());
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

    'keyup .price,.qty,.discount, click .price,.qty,.discount': function (e) {

        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();
        var amount = price * qty;
        var discount = thisObj.parents('div.row').find('.discount').val();
        thisObj.parents('div.row').find('.amount').val(amount - (amount * discount / 100));

        if (price != 0 && qty != 0 || discount != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }

        calculateTotal();
    }
});

/**
 * Show
 */

Template.dental_registerShow.helpers({
    diagnosisFormat: function () {

        var diagnosis = "";
        var data = this.diagnosis;
        data.forEach(function (obj) {
            if (obj != null) {
                diagnosis +=
                    "Diagnosis Id = " + obj.diagnosisId +
                    ", Qty = " + obj.qty +
                    ", Price = " + obj.price +
                    ", Amount = " + obj.amount + "<br>";
            }
        });

        return new Spacebars.SafeString(diagnosis);
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_registerInsert: {
        before: {
            insert: function (doc) {
                var patientId = doc.patientId + "-";
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Register, patientId, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    dental_registerUpdate: {
        onSuccess: function (formType, result) {
            alertify.register().close();
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
    var registerDate = $('[name="registerDate"]');
    DateTimePicker.dateTime(registerDate);
};

/**
 * Calculate all amount to total
 */
function calculateTotal() {
    var total = 0;

    // Each amount
    $('.amount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        total += amount;
    });

    // set value on total
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
