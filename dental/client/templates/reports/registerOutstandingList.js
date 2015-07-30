Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_registerOutstandingListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_registerOutstandingListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateTime(name);
});

Template.dental_registerOutstandingListReport.events({});

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

        var index = 1;

        if (!_.isUndefined(getRegister)) {
            getRegister.forEach(function (obj) {
                obj.index = index;
                // checking this registerId make invoice or not
                var invoiceDoc = Dental.Collection.Invoice.findOne({registerId: obj._id,invoiceDate: {$lte: self.date}});

                if (_.isUndefined(invoiceDoc)) {
                    obj.patient = obj.patientId + " : " + obj._patient.name + " (" + obj._patient.gender + ")";

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

