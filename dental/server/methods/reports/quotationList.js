Meteor.methods({
  dental_quotationList: function(params) {
    var self = params;
    var data = {
      title: {},
      header: [],
      content: [],
      footer: {},
      deposit: []
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company,
      date: self.date
    };

    /********* Header ********/

    var branch;
    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });
    var exchangeDoc = Cpanel.Collection.Exchange.findOne(self.exchange);

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName
    } else {
      branch = "All";
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Exchange: ' + '</b>' + numeral(exchangeDoc.rates
        .USD).format('$ 0,0.00') + " | " + numeral(exchangeDoc.rates
        .KHR).format('0,0.00') + " R" + " | " + numeral(exchangeDoc
        .rates.THB).format('0,0.00') + " B"
    }];

    /********** Content & Footer **********/
    var content = [];

    var selector = {};
    var selectorExchange = {};

    var date = self.date.split(" To ");
    var fromDate = moment(date[0] + " 00:00:00").format(
      "YYYY-MM-DD HH:mm:ss");
    var toDate = moment(date[1] + " 23:59:59").format(
      "YYYY-MM-DD HH:mm:ss");
    if (fromDate != null && toDate != null) selector.quotationDate = {
      $gte: fromDate,
      $lte: toDate
    };

    if (self.branchId != "") selector.branchId = self.branchId;
    if (self.exchange != "") selectorExchange._id = self.exchange;
    // Get quotation
    var getQuotation = Dental.Collection.Quotation.find(selector);
    //Get Exchange
    var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

    var index = 1;

    //Grand Total USD
    var grandTotalUsd = 0;
    //Grand Total KHR
    var grandTotalKhr = 0;
    //Grand Total THB
    var grandTotalThb = 0;

    if (!_.isUndefined(getQuotation)) {
      getQuotation.forEach(function(obj) {

        obj.index = index;
        obj.patient = obj._patient.name + " (" + obj._patient.gender +
          ")";
        obj.total = numeral(obj.total).format('0,0.00');

        if (!_.isUndefined(obj._patient.age)) {
          obj.age = obj._patient.age;
        } else {
          obj.age = "None";
        }

        content.push(obj);

        index += 1;

        //Grand Total USD
        grandTotalUsd += Math.round(obj.total * exchange.rates.USD);

        //Grand Total KHR
        grandTotalKhr += Math.round(obj.total * exchange.rates.KHR);

        //Grand Total THB
        grandTotalThb += Math.round(obj.total * exchange.rates.THB);
      });
    }
    data.footer.grandTotalUsd = numeral(grandTotalUsd).format('0,0.00');
    data.footer.grandTotalKhr = numeral(grandTotalKhr).format('0,0.00');
    data.footer.grandTotalThb = numeral(grandTotalThb).format('0,0.00');

    if (content.length > 0) {
      data.content = content;

      return data;
    } else {
      data.content.push({
        index: 'no results'
      });
      return data;
    }
  }
});
