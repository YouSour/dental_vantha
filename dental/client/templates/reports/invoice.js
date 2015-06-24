/************ Form *************/
Template.dental_invoiceReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_invoiceReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_invoiceReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_invoiceReportGen.helpers({
    data: function () {
        var self = this;
        var data = {
            title: {},
            header: [],
            content: [],
            footer: []
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company,
            date: self.date
        };

        /********* Header ********/
        data.header = [
            {col1: 'Patient: ' + self.patient, col2: 'Register: ' + self.register},
        ];

        /********** Content & Footer **********/
        var content = [];
        //var date = s.words(self.date, ' To ');
        //var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        //var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'day').toDate();

        // Get account selector
        //var accountSelector = {};
        //if (!_.isEmpty(self.branch)) {
        //    accountSelector.cpanel_branchId = {$regex: self.branch};
        //}
        //if (!_.isEmpty(self.currency)) {
        //    accountSelector.cpanel_currencyId = {$regex: self.currency};
        //}
        //if (!_.isEmpty(self.product)) {
        //    accountSelector.productId = {$regex: self.product};
        //}
        //if (!_.isEmpty(self.staff)) {
        //    accountSelector.staffId = {$regex: self.staff};
        //}
        //var getAccount = Saving.Collection.Account.find(accountSelector)
        //    .map(function (obj) {
        //        return obj._id;
        //    });
        //
        //// Get content
        //var getPerform = Saving.Collection.Perform.find({
        //    amount: {$gt: 0},
        //    accountId: {$in: getAccount},
        //    performDate: {$gte: date[0], $lte: date[1]}
        //}, {
        //    sort: {performDate: 1}
        //});
        //
        //var index = 1;
        //var totalAmount = {KHR: 0, USD: 0, THB: 0, all: 0};
        //getPerform.forEach(function (obj) {
        //    var account = Saving.Collection.Account.findOne(obj.accountId);
        //    var client = Saving.Collection.Client.findOne(account.clientId);
        //    var product = Saving.Collection.Product.findOne(account.productId);
        //    var amount = obj.amount;
        //
        //    // Check currency
        //    if (account.cpanel_currencyId == 'KHR') {
        //        totalAmount.KHR += amount;
        //        totalAmount.all += fx.convert(amount, {from: 'KHR', to: 'USD'});
        //    } else if (account.cpanel_currencyId == 'USD') {
        //        totalAmount.USD += amount;
        //        totalAmount.all += amount;
        //    } else {
        //        totalAmount.THB += amount;
        //        totalAmount.all += fx.convert(amount, {from: 'THB', to: 'USD'});
        //    }
        //
        //    content.push(
        //        {
        //            index: index,
        //            accountId: obj.accountId,
        //            client: client.khName + ' (' + client.enName + ')',
        //            product: account.productId,
        //            activeDate: obj.performDate,
        //            amount: numeral(amount).format('0,0.00'),
        //            currency: account.cpanel_currencyId,
        //            status: obj.status,
        //            voucherId: obj.voucherId,
        //            branch: obj.cpanel_branchId
        //        }
        //    );
        //    index += 1;
        //});

        content.push({index: 1, item: 'A', qty: 1, price: 50, subtotal: 50, discount: 0, amount: 50});
        content.push({index: 2, item: 'A', qty: 1, price: 50, subtotal: 50, discount: 0, amount: 50});

        if (content.length > 0) {
            data.content = content;
            //data.footer = [
            //    {
            //        col1: numeral(totalAmount.KHR).format('0,0.00'),
            //        col2: numeral(totalAmount.USD).format('0,0.00'),
            //        col3: numeral(totalAmount.THB).format('0,0.00'),
            //        col4: numeral(totalAmount.all).format('0,0.00')
            //    }
            //];

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
