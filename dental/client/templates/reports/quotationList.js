/************ Form *************/
Template.dental_quotationListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_quotationListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_quotationListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_quotationListReportGen.helpers({
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

        //console.log(self.patient);

        var patient,branch;
        var patientDoc = Dental.Collection.Patient.findOne(self.patient);
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(self.exchange);

        if (self.patient != "" ) {patient = patientDoc.name;} else {patient = 'All';}
        if (self.branchId != "" ) {branch = self.branchId;} else {branch = 'All';}



        //console.log(JSON.stringify(patientDoc));

        data.header = [
            {col1: 'Branch: ' + branch, col2:'Patient Name: ' + patient, col3:'Exchange: ' + numeral(exchangeDoc.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchangeDoc.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchangeDoc.rates.THB).format('0,0.00')+" B" }
            //{col1: 'Name: ', col2: 'Age: ' , col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var selectorExchange = {};

        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.quotationDate = {$gte: fromDate, $lte: toDate};

        if (self.patient != "")selector.patientId = self.patient;
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

        if (!_.isUndefined(getQuotation)) {
            getQuotation.forEach(function (obj) {

                obj.index = index;
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
            //data.footer = [
            //    {col1: 'Subtotal:', col2: numeral(getQuotation.subtotal).format('$0,0.00')},
            //    {col1: 'Discount:', col2: numeral(getQuotation.subDiscount).format('0,0.00')},
            //    {col1: 'Total:', col2: numeral(getQuotation.total).format('$0,0.00')}
            //];

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});