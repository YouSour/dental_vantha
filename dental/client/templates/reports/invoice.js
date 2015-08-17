Dental.ListForReportState = new ReactiveObj();
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
    },
    'change .patientId': function (e, t) {
        var patientId = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patientId);
    }

});

/************ Generate *************/
Template.dental_invoiceReportGen.helpers({
    data: function () {
        var self = this;
        var data = {
            title: {},
            header: {},
            content: [],
            deposit: [],
            footer: {}
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company
        };

        /********* Header ********/
        var registerDoc = Dental.Collection.Register.findOne(self.register);
        var exchange = Cpanel.Collection.Exchange.findOne({dateTime:{$lte:moment().format("YYYY-MM-DD HH:mm:ss")}},{sort: {dateTime: -1}});
        data.header = registerDoc;
        data.header.exchange = numeral(exchange.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchange.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchange.rates.THB).format('0,0.00')+" B";
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

        // Get invoice
        var getRegister = Dental.Collection.Register.findOne({_id: self.register});
        var index = 1;
        if (!_.isUndefined(getRegister)) {
            // Content
            _.each(getRegister.disease, function (obj) {
                var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
                obj.index = index;
                obj.itemName = itemDoc.name;
                obj.price = numeral(obj.price).format('0,0.00');
                obj.amount = numeral(obj.amount).format('0,0.00');

                content.push(obj);

                index += 1;
            });
            data.content = content;

            // Footer
            var footer = {};
            footer.subTotal = numeral(getRegister.subTotal).format('$0,0.00');
            footer.deposit = numeral(getRegister.deposit).format('$0,0.00');
            footer.subDiscount = numeral(getRegister.subDiscount).format('0,0.00');
            footer.total = numeral(getRegister.total).format('$0,0.00');
            footer.totalKhr = "R"+numeral(getRegister.total*exchange.rates.KHR).format('0,0.00');
            footer.totalThb = "THB"+numeral(getRegister.total*exchange.rates.THB).format('0,0.00');
            data.footer = footer;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
