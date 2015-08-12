Dental.RegisterState = new ReactiveObj();

//Template.afArrayField_customArrayFieldInvoiceForDiseaseItem.helpers({
//    register: function () {
//        var register = Dental.RegisterState.get('data');
//
//        return register;
//    }
//});

/***
 * Index
 */
Template.dental_register.onCreated(function () {
    createNewAlertify([
        'register',
        'patientAddon',
        'statusAction',
        'treatmentAction',
        'appointmentAction',
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
    'click .btn-link': function () {
        var self = this;
        checkRegisterClosing(self);
    },
    'click .insert': function () {
        alertify.register(fa("plus", "Register"), renderTemplate(Template.dental_registerInsert)).maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.Register.findOne({_id: this._id});

        // Get total deposit
        var totalDep = 0;
        Dental.Collection.Deposit.find({registerId: this._id})
            .forEach(function (obj) {
                totalDep += obj.amount;
            });
        data.totalDep = totalDep;

        alertify.register(fa("pencil", "Register"), renderTemplate(Template.dental_registerUpdate, data)).maximize();
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
    'click .statusAction': function () {
        if (this.status == "Active") {
            var data = Dental.Collection.Register.findOne({_id: this._id});
            alertify.statusAction(fa("pencil", "Register"), renderTemplate(Template.dental_registerClosingDate, data));
        }
    },
    'click .treatmentAction': function () {
        if (this.status == "Active") {
            registerState(this);
            alertify.treatmentAction(
                fa("medkit", "Treatment"),
                renderTemplate(Template.dental_treatment)
            ).maximize();
        }
    },
    'click .appointmentAction': function () {
        if (this.status == "Active") {
            registerState(this);
            alertify.appointmentAction(
                fa("clock-o", "Appointment"),
                renderTemplate(Template.dental_calendarEvent)
            ).maximize();
        }
    },
    'click .depositAction': function () {
        if (this.status == "Active") {
            registerState(this);
            alertify.depositAction(
                fa("ticket", "Deposit"),
                renderTemplate(Template.dental_deposit)
            ).maximize();
        }
    },
    // Print action
    'click .treatmentPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = 'treatmentReportGen?' + q;
        window.open(url);
    },
    'click .depositPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = 'depositReportGen?' + q;
        window.open(url);
    },
    'click .invoiceReportPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = 'invoiceReportGen?' + q;
        window.open(url);
    }
});


/**
 * Status Closing Date
 */
Template.dental_registerClosingDate.onRendered(function () {
    datepicker();
    //open registerClosingDate status change value "Close"
    $('[name="status"]').val("Close");
});

/**
 * Insert
 */
Template.dental_registerInsert.onRendered(function () {
    datepicker();
    statusAutoSelected();
    $('.btnAdd').attr('disabled', "disabled");
});

Template.dental_registerInsert.helpers({});

Template.dental_registerInsert.events({
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert));
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
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert));
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

            if (!_.isUndefined(checkingMemberPrice) && checkingMemberPrice.member == "Yes") {
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
 * Income By Doctor
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
 * Laboratory Expense
 */
Template.afArrayField_customArrayFieldInvoiceForLaboExpense.events({
    'click .btnRemoveForLaboExpense': function (e, t) {
        setTimeout(function () {
            var enable = true;
            $('.labo-amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });

            // Cal footer for labo expense
            calculateTotalForLaboExpense();
        }, 300);
    },
    'keyup .labo-amount': function (e, t) {
        // Cal footer for labo expense
        calculateTotalForLaboExpense();
    }
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
            $('select').each(function () {
                $(this).select2("val", "");
            });

            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    dental_registerClosingDate: {
        onSuccess: function (formType, result) {
            alertify.statusAction().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
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
    var closingDate = $('[name="closingDate"]');
    DateTimePicker.dateTime(registerDate);
    DateTimePicker.dateTime(closingDate);
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
 * Calculate total for income by doctor
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

/**
 * Calculate total for laboratory expense
 */
function calculateTotalForLaboExpense() {
    // Cal subtotal by items amount
    var totalForLaboExpense = 0;

    $('.labo-amount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        totalForLaboExpense += amount;
    });

    // Set value on subtotal textbox
    $('[name="laboExpenseTotal"]').val(totalForLaboExpense);
}

//AutoSelected
var statusAutoSelected = function () {
    $('[name="status"]').val("Active").trigger("change");
};

//check register Clsoe update & remove hide
function checkRegisterClosing(self) {
    var checkRegisterClosing = Dental.Collection.Register.findOne({_id: self._id});
    var registerClosing = checkRegisterClosing.status;

    if (registerClosing == "Active") {
        $('.update').show();
        $('.remove').show();
    } else {
        $('.update').hide();
        $('.remove').hide();
    }
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