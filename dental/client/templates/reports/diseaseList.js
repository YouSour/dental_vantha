/************ Form *************/
Template.dental_diseaseListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_diseaseListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_diseaseListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }

});

/************ Generate *************/
Template.dental_diseaseListReportGen.helpers({
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
            {col1: 'Branch: ' + branch}
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.invoiceDate = {$gte: fromDate, $lte: toDate};

        if (self.branchId != "") selector.branchId = self.branchId;

        // Get Invoice
        var getInvoice = Dental.Collection.Invoice.find(selector);

        var totalDisease = 0;
        var index = 1;
        var diseaseList = [];

        if (!_.isUndefined(getInvoice)) {
            getInvoice.forEach(function (obj) {
                obj.index = index;

                //Loop Disease Item
                obj.disease.forEach(function (disease) {
                    if (disease != null) {
                        disease.name = Dental.Collection.DiseaseItem.findOne(disease.item).name;
                        diseaseList.push(disease);
                    }
                });

            });
        }

        var result = [];
        diseaseList.reduce(function (key, val) {
            if (!key[val.item]) {//val.itemId
                key[val.item] = {//=group by
                    qty: 0,
                    name: val.name,
                    item: val.item,
                    price: val.price,
                    amount: val.amount,
                    index: index
                };
                index++;
                result.push(key[val.item]);
            } else {
                key[val.item].amount += val.amount;
            }
            key[val.item].qty += val.qty;
            totalDisease += val.qty;

            return key;

        }, {});

        content = result;
        content.totalDisease = totalDisease;

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});