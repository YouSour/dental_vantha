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
            footer: [],
            deposit: []
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company
        };

        /********* Header ********/
        var patientDoc = Dental.Collection.Patient.findOne(self.patient);
        data.header = [
            {col1: 'Patient ID: ' + self.patient, col2: 'Gender: ' + patientDoc.gender, col3: 'No: ' + self.register},
            {col1: 'Name: ' + patientDoc.name, col2: 'Age: ' + patientDoc.age, col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        // Get deposit
        var indexOfDeposit = 1;
        Dental.Collection.Deposit.find({registerId: self.register})
            .forEach(function (obj) {
                obj.index = indexOfDeposit;
                obj.amount = numeral(obj.amount).format('$0,0.00');

                data.deposit.push(obj);

                indexOfDeposit += 1;
            });

        // Get invoie
        var getInvoice = Dental.Collection.Invoice.findOne({registerId: self.register});
        var index = 1;
        _.each(getInvoice.disease, function (obj) {
            var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
            obj.index = index;
            obj.itemName = itemDoc.name;
            obj.price = numeral(obj.price).format('0,0.00');
            obj.amount = numeral(obj.amount).format('0,0.00');

            content.push(obj);

            index += 1;
        });

        if (content.length > 0) {
            data.content = content;
            data.footer = [
                {col1: 'Subtotal:', col2: numeral(getInvoice.subtotal).format('$0,0.00')},
                {col1: 'Deposit:', col2: numeral(getInvoice.deposit).format('$0,0.00')},
                {col1: 'Discount:', col2: numeral(getInvoice.subDiscount).format('0,0.00')},
                {col1: 'Total:', col2: numeral(getInvoice.total).format('$0,0.00')}
            ];

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
