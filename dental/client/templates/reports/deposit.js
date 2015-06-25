/************ Form *************/
Template.dental_depositReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

/************ Generate *************/
Template.dental_depositReportGen.helpers({
    data: function () {
        var self = this;
        var data = {
            title: {},
            header: [],
            content: []
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

        /********** Content **********/
        var content = [];

        // Get deposit
        var index = 1;
        Dental.Collection.Deposit.find({registerId: self.register})
            .forEach(function (obj) {
                obj.index = index;
                obj.amount = numeral(obj.amount).format('$0,0.00');

                content.push(obj);

                index += 1;
            });

        if (content.length > 0) {
            data.content = content;
            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
