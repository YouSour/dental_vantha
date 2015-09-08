Meteor.methods({
    dental_specialPayment: function (params) {
        var self = params;
        var data = {
            title: {},
            header: {},
            content: [],
            paymentMethod: [],
            footer: {}
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company
        };

        /********* Header ********/
        var registerDoc = Dental.Collection.SpecialPayment.findOne({specialRegisterId:self.specialRegister});
        var exchange = Cpanel.Collection.Exchange.findOne({dateTime:{$lte:moment().format("YYYY-MM-DD HH:mm:ss")}},{sort: {dateTime: -1}});
        data.header = registerDoc;
        data.header.exchange = numeral(exchange.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchange.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchange.rates.THB).format('0,0.00')+" B";
        /********** Content & Footer **********/
        var content = [];

        // Get Payment Method
        //console.log(parseInt(self.paymentMethod));
        var paymentMethodData = Dental.Collection.SpecialPayment.find({specialRegisterId: self.specialRegister});

        if (!_.isUndefined(paymentMethodData)) {

            paymentMethodData.forEach(function (object) {
                object._specialRegister.paymentMethod.forEach(function(obj) {
                    if (obj.index == object.paymentMethod) {

                        obj.amount = numeral(obj.amount).format('$0,0.00');
                        obj.paymentDate = object.paymentDate;
                        obj.paidAmount = numeral(object.paidAmount).format('$0,0.00');
                    }

                    obj.amount = numeral(obj.amount).format('$0,0.00');
                    data.paymentMethod.push(obj);
                });
            });
        }

        // Get Special Payment
        var specialPayment = Dental.Collection.SpecialPayment.findOne({specialRegisterId: self.specialRegister});
        var index = 1;
        if (!_.isUndefined(specialPayment)) {
            // Content
            _.each(specialPayment._specialRegister.disease, function (obj) {
                var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
                obj.index = index;
                obj.itemName = itemDoc.name;
                obj.price = numeral(obj.price).format('$0,0.00');
                obj.amount = numeral(obj.amount).format('$0,0.00');

                content.push(obj);

                index += 1;
            });
            data.content = content;

            // Footer
            //var footer = {};
            //footer.subTotal = numeral(specialPayment._specialRegister.subTotal).format('$0,0.00');
            //footer.subDiscount = numeral(specialPayment._specialRegister.subDiscount).format('0,0.00');
            //footer.total = numeral(specialPayment._specialRegister.total).format('$0,0.00');
            //footer.totalKhr = "R"+numeral(specialPayment._specialRegister.total*exchange.rates.KHR).format('0,0.00');
            //footer.totalThb = "THB"+numeral(specialPayment._specialRegister.total*exchange.rates.THB).format('0,0.00');
            //data.footer = footer;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});