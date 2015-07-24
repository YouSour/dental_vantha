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

        //console.log(self.patient);

        var branch;
        //var patientDoc = Dental.Collection.Patient.findOne(self.patient);

        if (self.branchId != "") {
            branch = self.branchId;
        } else {
            branch = "All";
        }
        //console.log(JSON.stringify(patientDoc));

        data.header = [
            //{col1: 'Patient ID: ' + self.patient, col2: 'Patient Name: ' + patientDoc.name,
            {col1: 'Branch: ' + branch}
            //{col1: 'Name: ', col2: 'Age: ' , col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};

        //Get Payment

        if (self.date != null) selector.invoiceDate = {$lte: self.date};
        if (self.branchId != "") selector.branchId = self.branchId;
        // Get invoice
        var getInvoice = Dental.Collection.Invoice.find(selector);


        var index = 1;

        //if (!_.isUndefined(getInvoice)) {
        getInvoice.forEach(function (obj) {
                obj.index = index;
                //debugger;
                //check invoice have payment or not
                //if (obj._id != null) {
                    var payment = Dental.Collection.Payment.findOne({invoiceId: obj._id});
                    //console.log("Rabbit" + payment._id);
                    //if (payment.status !== null && payment.status == "Partial") {
                    //  R
                    //else {
                    //    obj.amount = obj.total;
                    //}
                    if (payment.paymentDate >= self.date) {
                        console.log("Rabbit" + payment._id);
                    }
               // }
                content.push(obj);

                index += 1;
            }
        )
        ;
//}

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
})
;