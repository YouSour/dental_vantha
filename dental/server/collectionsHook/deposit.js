Dental.Collection.Deposit.after.insert(function (userId, doc) {
    Meteor.defer(function () {
        var getRegister = Dental.Collection.Register.findOne(doc.registerId);
        var deposit = math.round(getRegister.deposit + doc.amount, 2);
        var total = math.round(getRegister.total - doc.amount, 2);

        Dental.Collection.Register.update(doc.registerId, {$set: {deposit: deposit, total: total}});
    });
});

Dental.Collection.Deposit.after.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    var self = this;

    if (!_.isUndefined(modifier.$set.amount)) {
        Meteor.defer(function () {
            var variance = self.previous.amount - modifier.$set.amount;
            var getRegister = Dental.Collection.Register.findOne(modifier.$set.registerId);
            var deposit = math.round(getRegister.deposit -variance, 2);
            var total = math.round(getRegister.total +variance, 2);

            Dental.Collection.Register.update(doc.registerId, {$set: {deposit: deposit, total: total}});
        });
    }
});

Dental.Collection.Deposit.after.remove(function (userId, doc) {
    Meteor.defer(function () {
        var getRegister = Dental.Collection.Register.findOne(doc.registerId);
        var deposit = math.round(getRegister.deposit - doc.amount, 2);
        var total = math.round(getRegister.total + doc.amount, 2);

        Dental.Collection.Register.update(doc.registerId, {$set: {deposit: deposit, total: total}});
    });
});
