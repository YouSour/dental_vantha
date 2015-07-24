Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_registerOutstandingListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_registerOutstandingListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateTime(name);
});

Template.dental_registerOutstandingListReport.events({
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
Template.dental_registerOutstandingListReportGen.helpers({
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

        if (self.branchId != "") {
            branch = self.branchId;
        } else {
            branch = "All";
        }
        //console.log(JSON.stringify(patientDoc));

        data.header = [
            {col1: 'Brand: ' + branch, col2: '', col3: ''}
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};

        if (self.date != null) selector.registerDate = {$lte: self.date};
        if (self.branchId != "") selector.branchId = self.branchId;


        // Get Register
        var getRegister = Dental.Collection.Register.find(selector);
        //Get Exchange

        var index = 1;

        if (getRegister != undefined){
            getRegister.forEach(function (obj) {
                obj.index = index;

                obj.patient = obj.patientId + " : " + obj._patient.name + " (" + obj._patient.gender + ")";

                if (_.isUndefined(obj._invoiceCount) || obj._invoiceCount == 0) {
                    content.push(obj);
                    index += 1;
                }

            });
        }


        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});

