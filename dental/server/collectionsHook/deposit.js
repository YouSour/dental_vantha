Dental.Collection.Deposit.after.insert(function (userId, doc) {
    Meteor.defer(function () {
        var deposit = doc.amount;
        Dental.Collection.Register.direct.update(doc.registerId, {$inc: {deposit: deposit, total: deposit}});
    });
});

Dental.Collection.Deposit.after.update(function (userId, doc, fieldNames, modifier, options) {
    Meteor.defer(function () {
        modifier.$set = modifier.$set || {};
        var deposit = this.previous.amount - modifier.$set.amount;

        Dental.Collection.Register.direct.update(doc.registerId, {$inc: {deposit: deposit, total: deposit}});
    });
});

Dental.Collection.Deposit.after.remove(function (userId, doc) {
    Meteor.defer(function () {
        var deposit = doc.amount * (-1);
        Dental.Collection.Register.direct.update(doc.registerId, {$inc: {deposit: deposit, total: deposit}});
    });
});
