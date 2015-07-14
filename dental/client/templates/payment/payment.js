Dental.ListState = new ReactiveObj();
/*
 * Index
 */
Template.dental_payment.onRendered(function () {
    createNewAlertify(['payment', 'invoiceAddon', 'staffAddon']);
});

Template.dental_payment.helpers({});

Template.dental_payment.events({
    'click .btn-link': function () {
        var self = this;
        checkLastPayment(self);
    },
    'click .insert': function () {
        alertify.payment(fa("plus", "Payment"), renderTemplate(Template.dental_paymentInsert)).maximize();
    },
    'click .update': function () {
        var data = Dental.Collection.Payment.findOne({_id: this._id});
        alertify.payment(fa("pencil", "Payment"), renderTemplate(Template.dental_paymentUpdate, data)).maximize();
    },
    'click .remove': function () {
        var self = this;
        alertify.confirm(
            fa("remove", "Payment"),
            "Are you sure to delete [" + self._id + "] ?",
            function (result) {
                Dental.Collection.Payment.remove(self._id, function (error) {
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
        alertify.alert(fa("eye", "Payment"), renderTemplate(Template.dental_paymentShow, this));
    }
});

/*
 * Insert
 */
Template.dental_paymentInsert.onRendered(function () {
    datepicker();
});

Template.dental_paymentInsert.events({
    'click .invoiceAddon': function () {
        alertify.invoiceAddon(fa("plus", "Invoice"), renderTemplate(Template.dental_invoiceInsert)).maximize();
    },
    'click .staffAddon': function () {
        alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
    },
    'change .patientId': function (e) {
        var patientId = $(e.currentTarget).val();
        return Dental.ListState.set("patientId", patientId);
    },
    'change .invoiceId': function (e) {
        onChangeInvoice(e);
    },
    'keyup .paidAmount': function () {
        calculateBalance();
    }
});

/*
 * Update
 */
Template.dental_paymentUpdate.onRendered(function () {
    datepicker();
});

Template.dental_paymentUpdate.helpers({
    patientId: function () {
        return this.patientId;
    },
    invoiceId: function () {
        return this.invoiceId;
    }
});

Template.dental_paymentUpdate.events({
    'click .invoiceAddon': function () {
        alertify.invoiceAddon(fa("plus", "Invoice"), renderTemplate(Template.dental_invoiceInsert)).maximize();
    },
    'click .staffAddon': function () {
        alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
    },
    'change .invoiceId': function (e) {
        onChangeInvoice(e);
    },
    'keyup .paidAmount': function () {
        calculateBalance();
    }
});

// Hook
AutoForm.hooks({
    dental_paymentInsert: {
        before: {
            insert: function (doc) {
                debugger;
                var branchPre = Session.get('currentBranch') + '-' + moment().format("YYYYMMDD");
                doc._id = idGenerator.genWithPrefix(Dental.Collection.Payment, branchPre, 3);
                doc.branchId = Session.get('currentBranch');
                var dataInvoice = doc.invoiceId;

                if (dataInvoice != null) {
                    var splitInvoice = dataInvoice.split('|');
                    var invoiceId = splitInvoice[0];
                    doc.invoiceId = invoiceId;
                }
                
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
    dental_paymentUpdate: {
        onSuccess: function () {
            alertify.payment().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
function datepicker() {
    var paymentDate = $('[name="paymentDate"]');
    DateTimePicker.dateTime(paymentDate);
}

//check last payment
function checkLastPayment(self) {
    var checkingLastPayment = Dental.Collection.Payment.findOne({invoiceId: self.invoiceId}, {sort: {_id: -1}});
    var lastPayment = checkingLastPayment.paymentDate;
    console.log(lastPayment);

    if (lastPayment == self.paymentDate) {
        $('.update').show();
        $('.remove').show();
    } else {
        $('.update').hide();
        $('.remove').hide();
    }
}

// calculate Balance
function calculateBalance() {
    var dueAmount = $('.dueAmount').val();
    var paidAmount = $('.paidAmount').val();
    var balance = math.round(dueAmount - paidAmount, 2);
    $('.balance').val(balance);
}

// onChange Invoice
function onChangeInvoice(e) {
    var dataInvoice = $(e.currentTarget).val();
    var splitBalance = dataInvoice.split('|');
    var balance = splitBalance[1];

    var dueAmount, paidAmount, balance;

    if (dataInvoice != "") {
        dueAmount = balance;
        paidAmount = balance;
        balance = dueAmount - paidAmount;

    } else {
        dueAmount = 0;
        paidAmount = 0;
        balance = 0;
    }

    $('.dueAmount').val(dueAmount);
    $('.paidAmount').val(paidAmount);
    $('.balance').val(balance);
}