Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_registerListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_registerListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_registerListReport.events({
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
Template.dental_registerListReportGen.helpers({
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
            //{col1: 'Patient ID: ' + self.patient, col2: 'Patient Name: ' + patientDoc.name,
            {col1: 'Branch ID: ' + self.branchId, col3: 'Date: ' + self.date}
            //{col1: 'Name: ', col2: 'Age: ' , col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.registerDate = {$gte: fromDate, $lte: toDate};
        if (self.branchId != "All") selector.branchId = self.branchId;
        // Get register
        var getRegister = Dental.Collection.Register.find(selector);
        debugger;
        var index = 1;

        if (!_.isUndefined(getRegister)) {
            getRegister.forEach(function (obj) {
                //Get patient

                var getPatient = Dental.Collection.Patient.findOne({_id: obj.patientId});

                obj.index = index;
                obj.date = obj.registerDate;
                obj.registerId = obj._id;
                obj.patientId = obj.patientId;
                obj.name = getPatient.name;
                obj.gender = getPatient.gender;
                obj.age = getPatient.age;
                obj.address = getPatient.address;
                obj.telephone = getPatient.telephone;
                obj.description = obj.des;

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