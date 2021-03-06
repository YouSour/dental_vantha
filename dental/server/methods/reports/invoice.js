Meteor.methods({
  dental_invoice: function(params) {
    var self = params;
    var data = {
      title: {},
      header: {},
      content: [],
      deposit: [],
      payment: [],
      footer: {}
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company
    };

    /********* Header ********/
    var registerDoc = Dental.Collection.Register.findOne(self.register);

    if(registerDoc._patient.gender == "F"){
      registerDoc.genderWithKh = registerDoc._patient.gender +" (ស្រី)"
    }else {
      registerDoc.genderWithKh = registerDoc._patient.gender +" (ប្រុស)"
    }

    var exchange = Cpanel.Collection.Exchange.findOne({
      dateTime: {
        $lte: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    }, {
      sort: {
        dateTime: -1
      }
    });
    data.header = registerDoc;
    data.header.registerDate = moment(registerDoc.registerDate).format(
      "DD-MM-YYYY" + " (" + "HH:mm:ss" + ")");
    data.header.exchange = numeral(exchange.rates.USD).format('$ 0,0.00') +
      " | " + numeral(exchange.rates.KHR).format('0,0.00') + " R" + " | " +
      numeral(exchange.rates.THB).format('0,0.00') + " B";
    /********** Content & Footer **********/
    var content = [];

    // Get Payment
    Dental.Collection.Payment.find({
        registerId: self.register
      })
      .forEach(function(obj) {
        obj.paidAmount = numeral(obj.paidAmount).format('$0,0.00');
        obj.balance = numeral(obj.balance).format('$0,0.00');

        data.payment.push(obj);

        indexOfDeposit += 1;
      });

    // Get deposit
    var indexOfDeposit = 1;
    Dental.Collection.Deposit.find({
        registerId: self.register
      })
      .forEach(function(obj) {
        obj.index = indexOfDeposit;
        obj.price = numeral(obj.price).format('$0,0.00');
        obj.amount = numeral(obj.amount).format('$0,0.00');

        data.deposit.push(obj);

        indexOfDeposit += 1;
      });

    // Get invoice
    var getRegister = Dental.Collection.Register.findOne({
      _id: self.register
    });
    var index = 1;
    if (!_.isUndefined(getRegister)) {
      // Content

      _.each(getRegister.disease, function(obj) {
        var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
        obj.index = index;
        obj.itemName = itemDoc.name;
        obj.price = numeral(obj.price).format('$0,0.00');
        obj.discount = obj.discount + "%";
        obj.amount = numeral(obj.amount).format('$0,0.00');
        content.push(obj);

        index += 1;
      });
      data.content = content;

      // Footer
      var footer = {};
      var totalPaidAmount = 0;
      var totalTemp = 0;
      Dental.Collection.Payment.find({
        registerId: self.register
      }).forEach(function(objPayment) {
        totalPaidAmount += objPayment.paidAmount;
      });

      totalTemp = (getRegister.subTotal - getRegister.deposit) - getRegister.subDiscount;

      footer.subTotal = numeral(getRegister.subTotal).format('$0,0.00');
      footer.deposit = numeral(getRegister.deposit).format('$0,0.00');
      footer.subDiscount = numeral(getRegister.subDiscount).format('$0,0.00');
      footer.paidAmount = numeral(totalPaidAmount).format('$0,0.00');
      footer.total = numeral(totalTemp).format('$0,0.00');
      footer.totalKhr = "R" + numeral(totalTemp * exchange.rates.KHR).format('0,0.00');
      footer.totalThb = "THB" + numeral(totalTemp * exchange.rates.THB).format('0,0.00');
      data.footer = footer;

      return data;
    } else {
      data.content.push({
        index: 'no results'
      });
      return data;
    }
  }
});
