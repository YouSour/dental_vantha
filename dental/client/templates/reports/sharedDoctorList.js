/************ Form *************/
Template.dental_sharedDoctorListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_sharedDoctorListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_sharedDoctorListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }

});

/************ Generate *************/
Template.dental_sharedDoctorListReportGen.helpers({
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

        console.log(self.patient);

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
        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.registerDate = {$gte: fromDate, $lte: toDate};
        //if (fromDate != null && toDate != null) selector.disease.item;
        if (self.branchId != "") selector.branchId = self.branchId;

        // Get Disease
        var getDisease = Dental.Collection.DiseaseItem.find();
        debugger;
        var index = 1;
        var diseaseCount = 0 ;

        if (!_.isUndefined(getDisease)) {
            getDisease.forEach(function (obj) {
                obj.index = index;

                //Dental.Collection.Invoice.find(selector).forEach(function(d){
                //    alert(d.disease);
                //});

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