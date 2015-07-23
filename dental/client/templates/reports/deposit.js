Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_depositReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_depositReport.events({
    'change .patient': function (e) {
        var patient = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patient);
    }
});

/************ Generate *************/
Template.dental_depositReportGen.helpers({
    data: function () {
        var self = this;
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {}
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company
        };

        /********* Header ********/
        var registerDoc = Dental.Collection.Register.findOne(self.register);
        data.header = registerDoc;

        /********** Content **********/
        var content = [];

        // Get deposit
        var index = 1;
        var total = 0;
        Dental.Collection.Deposit.find({registerId: self.register})
            .forEach(function (obj) {
                obj.index = index;
                total += obj.amount;

                obj.amount = numeral(obj.amount).format('$0,0.00');

                content.push(obj);

                index += 1;
            });

        data.footer = {total: numeral(total).format('$0,0.00')};

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
