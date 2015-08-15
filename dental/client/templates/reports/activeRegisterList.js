/************ Form *************/
Template.dental_activeRegisterListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_activeRegisterListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateTime(name);
});

Template.dental_activeRegisterListReport.events({});

/************ Generate *************/
Template.dental_activeRegisterListReportGen.helpers({
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

        var branchDoc = Cpanel.Collection.Branch.findOne({_id:self.branchId});

        if (self.branchId != "") {branch = self.branchId+" | "+branchDoc.enName} else {branch = "All";}

        data.header = [
            {col1: 'Brand: ' + branch, col2: '', col3: ''}
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};

        if (self.date != null) selector.registerDate = {$lte: self.date };
        if(self.date!=null){
            selector.closingDate= {$or:['',{$gt:self.date}]};
        }
        if (self.branchId != "" ) {
            selector.branchId = self.branchId;
        }

        // Get Register
        var getRegister = Dental.Collection.Register.find(selector);

        var index = 1;

        if (!_.isUndefined(getRegister)) {
            getRegister.forEach(function (obj) {
                obj.index = index;

                    obj.patient = obj._patient.name + " (" + obj._patient.gender + ")";

                    content.push(obj);
                    index += 1;


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

