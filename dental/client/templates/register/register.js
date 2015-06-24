Dental.RegisterState = new ReactiveObj();
/***
 * Index
 */
Template.dental_register.onCreated(function () {
    createNewAlertify([
        'register',
        'patientAddon',
        'treatmentAction',
        'depositAction',
        'invoiceAction'
    ]);
});

Template.dental_register.helpers({
    selector: function () {
        var pattern = Session.get('currentBranch');
        return {branchId: pattern};
    }
});

Template.dental_register.events({
    'click .insert': function () {
        alertify.register(fa("plus", "Register"), renderTemplate(Template.dental_registerInsert));
    },
    'click .update': function () {
        var data = Dental.Collection.Register.findOne({_id: this._id});

        alertify.register(fa("pencil", "Register"), renderTemplate(Template.dental_registerUpdate, data));
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

        alertify.alert(fa("eye", "Register"), renderTemplate(Template.dental_registerShow, data));
    },
    'click .treatmentAction': function () {
        registerState(this);

        alertify.treatmentAction(
            fa("list", "Treatment"),
            renderTemplate(Template.dental_treatment)
        ).maximize();
    },
    'click .depositAction': function () {
        registerState(this);

        alertify.depositAction(
            fa("list", "Deposit"),
            renderTemplate(Template.dental_deposit)
        ).maximize();
    },
    'click .invoiceAction': function () {
        registerState(this);

        // Check invoice exist
        var invoiceExist = Dental.Collection.Invoice.findOne({registerId: this._id});
        if (_.isUndefined(invoiceExist)) {
            alertify.invoiceAction(
                fa("plus", "Invoice"),
                renderTemplate(Template.dental_invoiceInsert)
            ).maximize();
        } else {
            alertify.invoiceAction(
                fa("pencil", "Invoice"),
                renderTemplate(Template.dental_invoiceUpdate, invoiceExist)
            ).maximize();
        }
    },
    'click .invoiceReportAction': function () {
        var url = 'invoiceReportGen?patient=' + this.patientId + '&register=' + this._id + '&date=' + moment().format('YYYY-MM-DD');
        window.open(url, '_blank');
    }
});

/**
 * Insert
 */
Template.dental_registerInsert.onRendered(function () {
    datepicker();
    //$('.btnAdd').attr('disabled', "disabled");
});

Template.dental_registerInsert.helpers({});

Template.dental_registerInsert.events({
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert));
    }
    //'change .item': function (e, t) {
    //    var thisObj = $(e.currentTarget);
    //    var itemId = $(e.currentTarget).val();
    //    var qty, price, discount, amount;
    //
    //    if (itemId != "") {
    //        var itemDoc = Dental.Collection.DiseaseItem.findOne({_id: itemId});
    //
    //        qty = 1;
    //        price = itemDoc.price;
    //        discount = 0;
    //        amount = qty * price;
    //
    //        $('.btnAdd').attr('disabled', false);
    //    }
    //    else {
    //        $('.btnAdd').attr('disabled', true);
    //    }
    //
    //    thisObj.parents('div.row').find('.qty').val(qty);
    //    thisObj.parents('div.row').find('.price').val(price);
    //    thisObj.parents('div.row').find('.discount').val(discount);
    //    thisObj.parents('div.row').find('.amount').val(amount);
    //
    //    calculateTotal();
    //},
    //
    //'click .btnRemove': function (e, t) {
    //    setTimeout(function () {
    //        var enable = true;
    //        $('.amount').each(function () {
    //            var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
    //            if (amount == 0) {
    //                enable = false;
    //                return false;
    //            }
    //            enable = true;
    //        });
    //
    //        if (enable) {
    //            $('.btnAdd').attr('disabled', false);
    //        } else {
    //            $('.btnAdd').attr('disabled', true);
    //
    //        }
    //
    //        calculateTotal();
    //    }, 300);
    //
    //},
    //'keyup .qty,.discount, click .qty,.discount': function (e, t) {
    //    var thisObj = $(e.currentTarget);
    //    var qty = thisObj.parents('div.row').find('.qty').val();
    //    var price = thisObj.parents('div.row').find('.price').val();
    //    var discount = thisObj.parents('div.row').find('.discount').val();
    //    var amount = math.round(qty * price, 2);
    //    var amountAfterDiscount = math.round(amount - (amount * discount / 100), 2);
    //
    //    thisObj.parents('div.row').find('.amount').val(amountAfterDiscount);
    //
    //    if (qty > 0 && (discount >= 0 && discount <= 100)) {
    //        $('.btnAdd').removeAttr('disabled');
    //    } else {
    //        $('.btnAdd').attr('disabled', "disabled");
    //    }
    //
    //    calculateTotal();
    //}
});


/**
 * Update
 */
Template.dental_registerUpdate.onRendered(function () {
    datepicker();

    //run this function when on update get value for total
    //calculateTotal();
});

Template.dental_registerUpdate.helpers({});

Template.dental_registerUpdate.events({
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert));
    }
    //'change .item': function (e, t) {
    //    var thisObj = $(e.currentTarget);
    //    var itemId = $(e.currentTarget).val();
    //    var qty, price, discount, amount;
    //
    //    if (itemId != "") {
    //        var itemDoc = Dental.Collection.DiseaseItem.findOne({_id: itemId});
    //
    //        qty = 1;
    //        price = itemDoc.price;
    //        discount = 0;
    //        amount = qty * price;
    //
    //        $('.btnAdd').attr('disabled', false);
    //    }
    //    else {
    //        $('.btnAdd').attr('disabled', true);
    //    }
    //
    //    thisObj.parents('div.row').find('.qty').val(qty);
    //    thisObj.parents('div.row').find('.price').val(price);
    //    thisObj.parents('div.row').find('.discount').val(discount);
    //    thisObj.parents('div.row').find('.amount').val(amount);
    //
    //    calculateTotal();
    //},
    //
    //'click .btnRemove': function (e, t) {
    //    setTimeout(function () {
    //        var enable = true;
    //        $('.amount').each(function () {
    //            var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
    //            if (amount == 0) {
    //                enable = false;
    //                return false;
    //            }
    //            enable = true;
    //        });
    //
    //        if (enable) {
    //            $('.btnAdd').attr('disabled', false);
    //        } else {
    //            $('.btnAdd').attr('disabled', true);
    //
    //        }
    //
    //        calculateTotal();
    //    }, 300);
    //
    //},
    //'keyup .qty,.discount, click .qty,.discount': function (e, t) {
    //    var thisObj = $(e.currentTarget);
    //    var qty = thisObj.parents('div.row').find('.qty').val();
    //    var price = thisObj.parents('div.row').find('.price').val();
    //    var discount = thisObj.parents('div.row').find('.discount').val();
    //    var amount = math.round(qty * price, 2);
    //    var amountAfterDiscount = math.round(amount - (amount * discount / 100), 2);
    //
    //    thisObj.parents('div.row').find('.amount').val(amountAfterDiscount);
    //
    //    if (qty > 0 && (discount >= 0 && discount <= 100)) {
    //        $('.btnAdd').removeAttr('disabled');
    //    } else {
    //        $('.btnAdd').attr('disabled', "disabled");
    //    }
    //
    //    calculateTotal();
    //}
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_registerInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + "-";

                doc._id = idGenerator.genWithPrefix(Dental.Collection.Register, prefix, 9);
                doc.branchId = Session.get('currentBranch');

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

/**
 * Register state
 */
var registerState = function (param) {
    var registerDoc = Dental.Collection.Register.findOne({_id: param._id});
    var patientDoc = Dental.Collection.Patient.findOne(registerDoc.patientId);
    var photo = Files.findOne(patientDoc.photo);
    if (photo) {
        patientDoc.photoUrl = photo.url();
    }
    registerDoc._patient = patientDoc;

    // Get deposit
    var deposit = 0;
    Dental.Collection.Deposit.find({registerId: param._id})
        .forEach(function (obj) {
            deposit += obj.amount;
        });
    registerDoc.deposit = deposit;

    console.log(registerDoc.deposit);

    // Get treatment
    var treatment = Dental.Collection.Treatment.find({registerId: param._id});
    registerDoc._treatment = treatment;

    console.log(registerDoc.deposit);

    // Set state for treatment
    Dental.RegisterState.set('data', registerDoc);
};