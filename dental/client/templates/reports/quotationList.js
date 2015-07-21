Dental.ListForReportState = new ReactiveObj();
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
    //,
    //'change .patientId': function (e, t) {
    //    var patientId = $(e.currentTarget).val();
    //    return Dental.ListForReportState.set("patientId", patientId);
    //}

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

        var patientId, patientName;
        var patientDoc = Dental.Collection.Patient.findOne(self.patient);
        if (self.patient != "") {
            patientId = patientDoc._id;
            patientName = patientDoc.name;
        } else {
            patientId = 'All';
            patientName = 'All';
        }

        //console.log(JSON.stringify(patientDoc));

        data.header = [
            {col1: 'Patient ID: ' + patientId, col2: '', col3: 'Patient Name: ' + patientName}
            //{col1: 'Name: ', col2: 'Age: ' , col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.quotationDate = {$gte: fromDate, $lte: toDate};

        if (self.patient != "")selector.patientId = self.patient;
        if (self.branchId != "") selector.branchId = self.branchId;
        // Get quotation
        var getQuotation = Dental.Collection.Quotation.find(selector);
        //debugger;
        var index = 1;

        if (!_.isUndefined(getQuotation)) {
            getQuotation.forEach(function (obj) {

                obj.index = index;
                obj.quotationId = obj._id;
                obj.date = obj.quotationDate;
                //obj.disease = diseaseDoc;
                obj.total = numeral(obj.total).format('0,0.00');

                content.push(obj);

                index += 1;
            });
        }

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