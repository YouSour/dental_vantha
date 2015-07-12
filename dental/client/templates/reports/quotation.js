Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_quotationReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_quotationReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_quotationReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    },
    'change .patientId': function (e, t) {
        var patientId = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patientId);
    }

});

/************ Generate *************/
Template.dental_quotationReportGen.helpers({
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
        var quotationDoc = Dental.Collection.Quotation.findOne(self.quotation);
        data.header = quotationDoc;

        /********** Content & Footer **********/
        var content = [];

        // Each item
        var index = 1;
        _.each(quotationDoc.disease, function (obj) {
            var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
            obj.index = index;
            obj.itemName = itemDoc.name;
            obj.price = numeral(obj.price).format('0,0.00');
            obj.amount = numeral(obj.amount).format('0,0.00');

            content.push(obj);

            index += 1;
        });

        data.footer.subtotal = numeral(quotationDoc.subtotal).format('0,0.00');
        data.footer.subDiscount = numeral(quotationDoc.subDiscount).format('0,0.00');
        data.footer.total = numeral(quotationDoc.total).format('0,0.00');

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
