Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_paymentListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_paymentListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_paymentListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    },
    'change .patientId': function (e, t) {
        var patientId = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patientId);
    }

});

/************ Generate *************/
Template.dental_paymentListReportGen.helpers({
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
            date : self.date
        };

        /********* Header ********/

        console.log(self.patient);

        var branch,staff,status;

        var branchDoc = Cpanel.Collection.Branch.findOne(self.branchId);
        var staffDoc = Dental.Collection.Staff.findOne(self.staff);
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(self.exchange);

        if (self.branchId != "") {branch = branchDoc._id;} else {branch = "All";}
        if (self.staff != "") {staff = staffDoc.name;} else {staff = "All";}
        if ( self.status != "") {status = self.status;} else {status = "All";}

        //console.log(JSON.stringify(patientDoc));

        data.header = [
            {col1: 'Branch: ' + branch, col1: 'Staff: ' + staff, col2: 'Status: ' + status , col3: 'Exchange: ' + numeral(exchangeDoc.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchangeDoc.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchangeDoc.rates.THB).format('0,0.00')+" B"}
        ];

        /********** Content & Footer **********/
        var content = [];


        var selector = {};
        var selectorExchange = {};

        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.paymentDate = {$gte: fromDate, $lte: toDate};

        // Filter
        if (self.staff != "") selector.staffId = self.staff;
        if (self.branchId != "") selector.branchId = self.branchId;
        if (self.status != "") selector.status = self.status;

        if (self.exchange != "") selectorExchange._id = self.exchange;

        //Get Exchange
        var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

        // Get payment
        var getPayment = Dental.Collection.Payment.find(selector);


        var index = 1;

        //Grand Total USD
        var grandTotalDueAmountUsd = 0;
        var grandTotalPaidAmountUsd = 0;
        var grandTotalBalanceUsd = 0;
        //Grand Total KHR
        var grandTotalDueAmountKhr = 0;
        var grandTotalPaidAmountKhr = 0;
        var grandTotalBalanceKhr = 0;

        if (!_.isUndefined(getPayment)) {
            getPayment.forEach(function (obj) {

                obj.index = index;
                obj.patientName = Dental.Collection.Patient.findOne(obj.patientId).name;
                obj.due = numeral(obj.dueAmount).format('0,0.00');
                obj.paid = numeral(obj.paidAmount).format('0,0.00');
                obj.balance = numeral(obj.balance).format('0,0.00');

                content.push(obj);
                index += 1;

                //Grand Total USD
                grandTotalDueAmountUsd += Math.round(obj.dueAmount * exchange.rates.USD);
                grandTotalPaidAmountUsd += Math.round(obj.paidAmount * exchange.rates.USD);
                grandTotalBalanceUsd += Math.round(obj.balance * exchange.rates.USD);

                //Grand Total KHR
                grandTotalDueAmountKhr += Math.round(obj.dueAmount * exchange.rates.KHR);
                grandTotalPaidAmountKhr += Math.round(obj.paidAmount * exchange.rates.KHR);
                grandTotalBalanceKhr += Math.round(obj.balance * exchange.rates.KHR);

            });
        }

        content.totalDueAmountUsd = numeral(grandTotalDueAmountUsd).format('0,0.00');
        content.totalPaidAmountUsd = numeral(grandTotalPaidAmountUsd).format('0,0.00');
        content.totalBalanceUsd = numeral(grandTotalBalanceUsd).format('0,0.00');

        content.totalDueAmountKhr = numeral(grandTotalDueAmountKhr).format('0,0.00');
        content.totalPaidAmountKhr = numeral(grandTotalPaidAmountKhr).format('0,0.00');
        content.totalBalanceKhr = numeral(grandTotalBalanceKhr).format('0,0.00');

        if (content.length > 0) {
            data.content = content;
            data.footer = [
                //{col1: 'Subtotal:', col2: numeral(getQuotation.subtotal).format('$0,0.00')},
                ////{col1: 'Deposit:', col2: numeral(getQuotation.deposit).format('$0,0.00')},
                //{col1: 'Discount:', col2: numeral(getQuotation.subDiscount).format('0,0.00')},
                //{col1: 'Total:', col2: numeral(getQuotation.total).format('$0,0.00')}
            ];

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
