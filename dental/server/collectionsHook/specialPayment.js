Dental.Collection.SpecialPayment.before.insert(function (userId, doc) {

    if (doc.balance != 0) {
        doc.status = "Partial";
    } else {
        doc.status = "Close";
    }
});

Dental.Collection.SpecialPayment.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    if (modifier.$set.balance != 0) {
        modifier.$set.status = "Partial";
    } else {
        modifier.$set.status = "Close";
    }
});
