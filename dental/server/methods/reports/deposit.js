Meteor.methods({
    dental_deposit: function (params) {
        Meteor._sleepForMs(1000);

        var self = params;
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {}
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();

        data.title = {
            company: company,
            exchange:exchange
        };

        /********* Header ********/
        var registerDoc = Dental.Collection.Register.findOne(self.register);
        //Get Exchange
        var exchange = Cpanel.Collection.Exchange.findOne({dateTime:{$lte:moment().format("YYYY-MM-DD HH:mm:ss")}},{sort: {dateTime: -1}});
        data.header = registerDoc;
        data.header.exchange = numeral(exchange.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchange.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchange.rates.THB).format('0,0.00')+" B";
        /********** Content **********/
        var content = [];

        // Get deposit
        var index = 1;
        var total = 0;
        var totalKhr = 0;
        Dental.Collection.Deposit.find({registerId: self.register})
            .forEach(function (obj) {
                obj.index = index;
                total += obj.amount;
                totalKhr += obj.amount * exchange.rates.KHR;
                obj.amount = numeral(obj.amount).format('$0,0.00');

                content.push(obj);

                index += 1;
            });

        data.footer = {
            total: numeral(total).format('$0,0.00'),
            totalKhr: "R"+numeral(totalKhr).format('0,0.00')
        };

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});