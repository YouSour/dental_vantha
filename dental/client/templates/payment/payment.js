Dental.ListState = new ReactiveObj();
/*
 * Index
 */
Template.dental_payment.onCreated(function() {
  createNewAlertify(['payment', 'registerAddon', 'staffAddon',
    'patientAddon'
  ]);
});

Template.dental_payment.helpers({
  register: function() {
    return Dental.ListState.get('data');
  },
  selector: function() {
    var registerId = Dental.ListState.get('data')._id;

    return {
      registerId: registerId
    };
  }
});

Template.dental_payment.events({
  'click .btn-link': function() {
    var self = this;
    checkLastPayment(self);
  },
  'click .insert': function() {
    Session.set('closePayment', true);
    var data = Dental.ListState.get('data');

    // Check last balance
    var paymentLast = Dental.Collection.Payment.findOne({
      registerId: data._id
    }, {
      sort: {
        _id: -1
      }
    });

    //get date time from system
    data.paymentDate = moment(Date()).format("YYYY-MM-DD HH:mm:ss");

    if (!_.isUndefined(paymentLast)) {
      data.total = paymentLast.balance;
    }

      alertify.payment(fa("plus", "Payment"), renderTemplate(Template
        .dental_paymentInsert, data));
  },
  'click .update': function() {
    var data = Dental.Collection.Payment.findOne({
      _id: this._id
    });
    alertify.payment(fa("pencil", "Payment"), renderTemplate(Template.dental_paymentUpdate,
      data));
  },
  'click .remove': function() {
    var self = this;
    alertify.confirm(
      fa("remove", "Payment"),
      "Are you sure to delete [" + self._id + "] ?",
      function(result) {
        Dental.Collection.Payment.remove(self._id, function(error) {
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
  'click .show': function() {
    alertify.payment(fa("eye", "Payment"), renderTemplate(Template.dental_paymentShow,
      this));
  },
  'click .paymentPrintAction': function() {
    var q = 'patient=' + this.patientId + '&register=' + this.registerId;
    var url = 'invoiceReportGen?' + q;
    window.open(url);
  }
});

/*
 * Insert
 */
Template.dental_paymentInsert.onRendered(function() {
  datepicker();
});

Template.dental_paymentInsert.events({
  'click .staffAddon': function() {
    alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  },
  'keyup .paidAmount': function() {
    calculateBalance();
  },
  'click #saveAndPrint': function() {
    Session.set('printInvoicePayment', true);
  },
  'click .btnFree': function(e, t) {
    $('.dueAmount, .paidAmount, .balance').val(0);
  }
});

/*
 * Update
 */
Template.dental_paymentUpdate.onRendered(function() {
  datepicker();
});

Template.dental_paymentUpdate.helpers({
  registerId: function() {
    return this.registerId;
  }
});

Template.dental_paymentUpdate.events({
  'click .staffAddon': function() {
    alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  },
  'keyup .paidAmount': function() {
    calculateBalance();
  },
  'click .btnFree': function(e, t) {
    $('.dueAmount, .paidAmount, .balance').val(0);
  }
});

// Hook
AutoForm.hooks({
  dental_paymentInsert: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        var prefix = doc.branchId + '-';
        Meteor.call('dental', prefix);
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closePayment')) {
        alertify.payment().close();
      }

      var printSession = Session.get('printInvoicePayment');
      Meteor.call('getPaymentId', result, function (err, result) {
        var data = Dental.Collection.Payment.findOne(result);
          if (printSession) {
            var q = 'patient=' + data.patientId + '&register=' + data.registerId;
            var url = '/dental/invoiceReportGen?' + q;
            window.open(url);
          }
          Session.set('printInvoicePayment', false);
      });
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_paymentUpdate: {
    onSuccess: function() {
      alertify.payment().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
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
  var checkingLastPayment = Dental.Collection.Payment.findOne({
    registerId: self.registerId
  }, {
    sort: {
      _id: -1
    }
  });
  var lastPayment = checkingLastPayment.paymentDate;

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
