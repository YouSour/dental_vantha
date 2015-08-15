Meteor.methods({
    dental_osForClosingRegisterReport: function (params) {
        var self = params;
        var data = {
            title: {},
            header: [],
            content: [],
            footer: {},
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

        var branchDoc = Cpanel.Collection.Branch.findOne({_id: self.branchId});
        var exchange = Cpanel.Collection.Exchange.findOne({_id: self.exchange});

        if (self.branchId != "") {
            branch = self.branchId + " | " + branchDoc.enName
        } else {
            branch = "All";
        }

        data.header = [
            {
                col1: 'Brand: ' + branch,
                col2: '',
                col3: 'Exchange: ' + numeral(exchange.rates.USD).format('$ 0,0.00') + " | " + numeral(exchange.rates.KHR).format('0,0.00') + " R" + " | " + numeral(exchange.rates.THB).format('0,0.00') + " B"
            }
        ];

        /********** Content & Footer **********/
        var content = [];
        var selector = {};

        selector.status = 'Close';
        var dateVal = self.date + ' 23:59:59';
        selector.closingDate = {$lt: dateVal};
        if (self.branchId != "") selector.branchId = self.branchId;

        // Get invoice
        var getRegister = Dental.Collection.Register.find(selector);

        var index = 1;

        // Sub total
        var grandTotalUsd = 0;
        var grandTotalKhr = 0;

        if (!_.isUndefined(getRegister)) {
            getRegister.forEach(function (obj) {
                //check last payment
                var paymentDoc = Dental.Collection.Payment.findOne({
                    registerId: obj._id,
                    paymentDate: {$lte: dateVal}
                }, {sort: {_id: -1}});

                if (_.isUndefined(paymentDoc) || paymentDoc.status == "Partial") {
                    obj.index = index;
                    obj.patientGender = obj._patient.name + " (" + obj._patient.gender + ")";
                    obj.lastPaidDate = paymentDoc.paymentDate;

                    var dueAmount = math.round(obj.total - paymentDoc.balance);
                    obj.totalFm = numeral(obj.total).format('0,0.00');
                    obj.totalDueFm = numeral(dueAmount).format('0,0.00');
                    obj.balanceFm = numeral(paymentDoc.balance).format('0,0.00');

                    //Grand Total USD
                    grandTotalUsd += math.round(paymentDoc.balance);
                    grandTotalKhr += math.round(paymentDoc.balance * exchange.rates.KHR);

                    content.push(obj);

                    index += 1;
                }
            });
        }

        data.footer.grandTotalUsd = numeral(grandTotalUsd).format('0,0.00');
        data.footer.grandTotalKhr = numeral(grandTotalKhr).format('0,0.00');

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});