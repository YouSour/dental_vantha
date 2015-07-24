Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_invoiceOutstandingListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_invoiceOutstandingListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateTime(name);
});

Template.dental_invoiceOutstandingListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
    //,
    //'change .patientId': function (e, t) {
    //    var patientId = $(e.currentTarget).val();
    //    return Dental.ListForReportState.set("patientId", patientId);
    //}

});

/************ Generate *************/
Template.dental_invoiceOutstandingListReportGen.helpers({
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

        var branch;
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(self.exchange);

        if (self.branchId != "") {
            branch = self.branchId;
        } else {
            branch = "All";
        }
        //console.log(JSON.stringify(patientDoc));

        data.header = [
            {col1: 'Brand: ' + branch, col2: '', col3: 'Exchange: ' + numeral(exchangeDoc.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchangeDoc.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchangeDoc.rates.THB).format('0,0.00')+" B"}
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var selectorExchange = {};


        if (self.date != null) selector.invoiceDate = {$lte: self.date};
        if (self.branchId != "") selector.branchId = self.branchId;
        if (self.exchange != "") selectorExchange._id = self.exchange;

        // Get invoice
        var getInvoice = Dental.Collection.Invoice.find(selector);
        //Get Exchange
        var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);


        var index = 1;

        //Grand Total USD
        var grandTotalUsd = 0;
        //Grand Total KHR
        var grandTotalKhr = 0;

        if (!_.isUndefined(getInvoice)) {
            getInvoice.forEach(function (obj) {
                obj.index = index;


                //check invoice have payment or not
                var paymentDoc = Dental.Collection.Payment.findOne({invoiceId: obj._id}, {sort: {_id: -1}});

                if (!_.isUndefined(paymentDoc) && paymentDoc.paymentDate <= self.date && paymentDoc.status == "Partial") {
                    obj.date = obj.invoiceDate;
                    obj.patient = obj.patientId + " : " + obj._register._patient.name + " (" + obj._register._patient.gender + ")";
                    obj.id = obj._id;
                    obj.age = obj._register._patient.age;
                    obj.dueAmo = numeral(paymentDoc.dueAmount).format('0,0.00');
                    obj.paidAmo = numeral(paymentDoc.paidAmount).format('0,0.00');
                    obj.outAmo = numeral(paymentDoc.balance).format('0,0.00');

                    //Grand Total USD
                    grandTotalUsd += Math.round(obj.outAmo * exchange.rates.USD);

                    //Grand Total KHR
                    grandTotalKhr += Math.round(obj.outAmo * exchange.rates.KHR);

                    content.push(obj);
                } else if (_.isEmpty(paymentDoc)) {
                    obj.date = obj.invoiceDate;
                    obj.patient = obj.patientId + " : " + obj._register._patient.name + " (" + obj._register._patient.gender + ")";
                    obj.id = obj._id;
                    obj.age = obj._register._patient.age;
                    obj.dueAmo = numeral(obj.total).format('0,0.00');
                    obj.paidAmo = numeral(0).format('0,0.00');
                    obj.outAmo = numeral(obj.total).format('0,0.00');

                    //Grand Total USD
                    grandTotalUsd += Math.round(obj.outAmo * exchange.rates.USD);

                    //Grand Total KHR
                    grandTotalKhr += Math.round(obj.outAmo * exchange.rates.KHR);

                    content.push(obj);
                }

                index += 1;

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

