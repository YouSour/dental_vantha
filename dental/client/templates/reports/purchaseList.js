Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_purchaseListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_purchaseListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_purchaseListReport.events({
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
Template.dental_purchaseListReportGen.helpers({
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

        //console.log(self.patient);

        var supplierId, supplierName, branch;
        var supplierDoc = Dental.Collection.Supplier.findOne(self.supplierId);
        if (self.supplierId != "") {
            supplierId = supplierDoc._id;
            supplierName = supplierDoc.name;
            branch = self.branchId;
        } else {
            supplierId = 'All';
            supplierName = 'All';
            branch = 'All';
        }

        //console.log(JSON.stringify(patientDoc));

        data.header = [
            {col1:'Brand ID: ' + branch, col2:'Supplier ID: ' + supplierId, col3: 'Suppiler Name: ' + supplierName}
            //{col1: 'Name: ', col2: 'Age: ' , col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.purchaseDate = {$gte: fromDate, $lte: toDate};

        if (self.supplierId != "")selector.supplierId = self.supplierId;
        if (self.branchId != "") selector.branchId = self.branchId;
        // Get purchase
        var getPurchase = Dental.Collection.Purchase.find(selector);
        //debugger;
        var index = 1;

        if (!_.isUndefined(getPurchase)) {
            getPurchase.forEach(function (obj) {

                obj.index = index;

                if(obj._register != null) {
                    obj.patientName = obj._register._patient.name;
                }else{
                    obj.patientName = "None";
                }

                obj.itemName = "";
                obj.items.forEach(function(i){
                    obj.itemName += Dental.Collection.OrderItem.findOne(i.orderItemId).name;
                });

                obj.total = numeral(obj.total).format('0,0.00');

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