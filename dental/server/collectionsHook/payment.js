Dental.Collection.Payment.before.insert(function (userId, doc) {
    doc.createdAt = new Date();

    if (doc.balance != 0) {
        doc.status = "Partial";
    } else {
        doc.status = "Close";
    }
});

Dental.Collection.Payment.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = new Date();

    if (modifier.$set.balance != 0) {
        modifier.$set.status = "Partial";
    } else {
        modifier.$set.status = "Close";
    }
});
