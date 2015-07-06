//Dental.ListForReportState = new ReactiveObj();
///************ Form *************/
//Template.dental_quotationReport.onCreated(function () {
//    createNewAlertify('exchange');
//});
//
//Template.dental_quotationReport.onRendered(function () {
//    var name = $('[name="date"]');
//    DateTimePicker.date(name);
//});
//
//Template.dental_quotationReport.events({
//    'click .exchangeAddon': function (e, t) {
//        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
//    },
//    'change .patientId': function (e, t) {
//        var patientId = $(e.currentTarget).val();
//        return Dental.ListForReportState.set("patientId", patientId);
//    }
//
//});

/************ Generate *************/
Template.dental_quotationReportGen.helpers({
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
            company: company
        };

        /********* Header ********/

        console.log(self.patient);

        var patientDoc = Dental.Collection.Patient.findOne(self.patient);

        console.log(JSON.stringify(patientDoc));

        data.header = [
            {col1: 'Patient Name: ' + self.patient, col2: 'Date: ' + self.date, col3: 'No: ' + self.register},
            //{col1: 'Name: ', col2: 'Age: ' , col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        // Get quotation
        var getQuotation = Dental.Collection.Quotation.findOne({_id: self.register});
        var index = 1;
        if (!_.isUndefined(getQuotation)) {
            _.each(getQuotation.disease, function (obj) {
                var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
                obj.index = index;
                obj.itemName = itemDoc.name;
                obj.price = numeral(obj.price).format('0,0.00');
                obj.amount = numeral(obj.amount).format('0,0.00');

                content.push(obj);

                index += 1;
            });
        }

        if (content.length > 0) {
            data.content = content;
            data.footer = [
                {col1: 'Subtotal:', col2: numeral(getQuotation.subtotal).format('$0,0.00')},
                //{col1: 'Deposit:', col2: numeral(getQuotation.deposit).format('$0,0.00')},
                {col1: 'Discount:', col2: numeral(getQuotation.subDiscount).format('0,0.00')},
                {col1: 'Total:', col2: numeral(getQuotation.total).format('$0,0.00')}
            ];

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
