/************ Form *************/
Template.dental_purchaseListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_purchaseListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_purchaseListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }

});

/************ Generate *************/
Template.dental_purchaseListReportGen.helpers({
    data: function () {
        var self = this;
        var data = {
            title: {},
            header: [],
            content: [],
            footer: [],
            deposit: []
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company,
            date: self.date
        };

        /********* Header ********/

        var supplierName, branch;

        var branchDoc = Cpanel.Collection.Branch.findOne({_id:self.branchId});
        var supplierDoc = Dental.Collection.Supplier.findOne({_id:self.supplierId});
        var exchangeDoc = Cpanel.Collection.Exchange.findOne({_id:self.exchange});

        if (self.branchId != "") {branch = self.branchId+" | "+branchDoc.enName} else {branch = "All";}
        if (self.supplierId != "") {supplierName = self.supplierId+" | "+supplierDoc.name;} else {supplierName = 'All';}

        data.header = [
            {col1: 'Brand: ' + branch, col2: 'Supplier Name: ' + supplierName, col3: 'Exchange: ' + numeral(exchangeDoc.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchangeDoc.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchangeDoc.rates.THB).format('0,0.00')+" B"},
            {col1: '', col2: '' , col3: ''}
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var selectorExchange = {};

        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.purchaseDate = {$gte: fromDate, $lte: toDate};

        if (self.supplierId != "")selector.supplierId = self.supplierId;
        if (self.branchId != "") selector.branchId = self.branchId;
        if (self.exchange != "") selectorExchange._id = self.exchange;
        // Get purchase
        var getPurchase = Dental.Collection.Purchase.find(selector);
        //Get Exchange
        var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

        var index = 1;

        //Grand Total USD
        var grandTotalUsd = 0;
        //Grand Total KHR
        var grandTotalKhr = 0;

        if (!_.isUndefined(getPurchase)) {
            getPurchase.forEach(function (obj) {

                obj.index = index;

                if (obj._register != null) {
                    obj.patientName = obj._register._patient.name;
                } else {
                    obj.patientName = "None";
                }

                var item = '';
                obj.items.forEach(function (i) {
                    item += '<tr>' +
                        '<td>' + Dental.Collection.OrderItem.findOne(i.orderItemId).name + '</td>' +
                        '<td>' + i.qty + '</td>' +
                        '<td>' + i.price + '</td>' +
                        '<td>' + i.amount + '</td>' +
                        '</tr>';
                });
                obj.items = item;

                obj.total = numeral(obj.total).format('0,0.00');

                content.push(obj);

                index += 1;

                //Grand Total USD
                grandTotalUsd += Math.round(obj.total * exchange.rates.USD);

                //Grand Total KHR
                grandTotalKhr += Math.round(obj.total * exchange.rates.KHR);
            });
        }

        content.grandTotalUsd = numeral(grandTotalUsd).format('0,0.00');
        content.grandTotalKhr = numeral(grandTotalKhr).format('0,0.00');

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});