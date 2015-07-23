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

        // History
        var history = [];
        _.each(data._patient.history, function (val) {
            var historyDoc = Dental.Collection.DiseaseHistory.findOne(val);
            history.push(historyDoc.name);
        });
        data._patient.historyVal = JSON.stringify(history, null, ' ');

        // Photo
        data._patient.photoUrl = null;
        if (!_.isUndefined(data._patient.photo)) {
            data._patient.photoUrl = Files.findOne(data._patient.photo).url();
        }

        alertify.alert(fa("eye", "Register"), renderTemplate(Template.dental_registerShow, data));
    },
    'click .treatmentAction': function () {
        registerState(this);

        alertify.treatmentAction(
            fa("medkit", "Treatment"),
            renderTemplate(Template.dental_treatment)
        ).maximize();
    },
    'click .appointmentAction': function () {
        registerState(this);

        alertify.treatmentAction(
            fa("clock-o", "Appointment"),
            renderTemplate(Template.dental_calendarEvent)
        ).maximize();
    },
    'click .depositAction': function () {
        registerState(this);

        alertify.depositAction(
            fa("ticket", "Deposit"),
            renderTemplate(Template.dental_deposit)
        ).maximize();
    },
    'click .invoiceAction': function () {
        registerState(this);

        // Check invoice exist
        var invoiceExist = Dental.Collection.Invoice.findOne({registerId: this._id});
        if (_.isUndefined(invoiceExist)) {
            alertify.invoiceAction(
                fa("plus", "Invoice Add New"),
                renderTemplate(Template.dental_invoiceInsert)
            ).maximize();
        } else {
            alertify.invoiceAction(
                fa("pencil", "Invoice Update"),
                renderTemplate(Template.dental_invoiceUpdate, invoiceExist)
            ).maximize();
        }
    },
    // Print action
    'click .treatmentPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = Router.url('dental.treatmentReportGen', {}, {query: q});
        window.open(url);
    },
    'click .depositPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = Router.url('dental.depositReportGen', {}, {query: q});
        window.open(url);
    },
    'click .invoiceReportPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = Router.url('dental.invoiceReportGen', {}, {query: q});
        window.open(url);
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
            $('select').each(function(){
                $(this).select2("val","");
            });

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
    /***** Patient *****/
    // History
    var history = [];
    _.each(registerDoc._patient.history, function (val) {
        var historyDoc = Dental.Collection.DiseaseHistory.findOne(val);
        history.push(historyDoc.name);
    });
    registerDoc._patient.historyVal = JSON.stringify(history, null, ' ');

    // Photo
    registerDoc._patient.photoUrl = null;
    if (!_.isUndefined(registerDoc._patient.photo)) {
        registerDoc._patient.photoUrl = Files.findOne(registerDoc._patient.photo).url();
    }

    // Get deposit
    var deposit = 0;
    Dental.Collection.Deposit.find({registerId: param._id})
        .forEach(function (obj) {
            deposit += obj.amount;
        });
    registerDoc.deposit = deposit;

    // Get treatment
    var treatment = Dental.Collection.Treatment.find({registerId: param._id});
    registerDoc._treatment = treatment;

    // Set state for treatment
    Dental.RegisterState.set('data', registerDoc);
};