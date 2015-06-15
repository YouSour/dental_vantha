/***
 * Index
 */
Template.clinic_register.onRendered(function () {
    createNewAlertify('register');
});

Template.clinic_register.events({
    'click .insert': function () {
        alertify.register(renderTemplate(Template.clinic_registerInsert))
            .set({
                title: fa("plus", "Register")
            })
            .maximize();
    },
    'click .update': function () {
        var data = Clinic.Collection.Register.findOne({_id: this._id});
        alertify.register(renderTemplate(Template.clinic_registerUpdate, data))
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
                    Clinic.Collection.Register.remove(id, function (error) {
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
        alertify.alert(renderTemplate(Template.clinic_registerShow, this))
            .set({
                title: fa("eye", "Register")
            })
    }
});

/**
 * Insert
 */
Template.clinic_registerInsert.onRendered(function () {
    datepicker();
    $('.btnAdd').attr('disabled', "disabled");
});

Template.clinic_registerInsert.helpers({});

Template.clinic_registerInsert.events({
    'change .diagnosisId': function (e) {

        var thisObj = $(e.currentTarget);
        var diagnosisId = $(e.currentTarget).val();
        if(diagnosisId != "") {
            var dataDiagnosis = Clinic.Collection.Disease.findOne({_id: diagnosisId});
            $('.btnAdd').attr('disabled',false);
        }
        else{
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
 * Update
 */
Template.clinic_registerUpdate.onRendered(function () {
    datepicker();

    //run this function when on update get value for total
    calculateTotal();
});

Template.clinic_registerUpdate.helpers({});

Template.clinic_registerUpdate.events({
    'change .diagnosisId': function (e) {

        var thisObj = $(e.currentTarget);
        var diagnosisId = $(e.currentTarget).val();
        if(diagnosisId != "") {
            var dataDiagnosis = Clinic.Collection.Disease.findOne({_id: diagnosisId});
            $('.btnAdd').attr('disabled',false);
        }
        else{
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

Template.clinic_registerShow.helpers({
    diagnosisFormat: function () {

        var diagnosis = "";
        var data = this.diagnosis;
        data.forEach(function (obj) {
            diagnosis +=
                "Diagnosis Id = " + obj.diagnosisId +
                ", Qty = " + obj.qty +
                ", Price = " + obj.price +
                ", Amount = " + obj.amount + "<br>";
        });

        return new Spacebars.SafeString(diagnosis);
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    clinic_registerInsert: {
        before: {
            insert: function (doc) {
                var patientId = doc.patientId + "-";
                doc._id = idGenerator.genWithPrefix(Clinic.Collection.Register, patientId, 3);
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
    clinic_registerUpdate: {
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
 * Return current date after Insert Success
 *
 * @returns {currentDate}
 */


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
