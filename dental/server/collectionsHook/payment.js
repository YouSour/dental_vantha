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
    modifier.updatedAt = new Date();
    var items = [];

    _.each(modifier.$set.disease, function (obj) {
        if (!_.isNull(obj)) {
            items.push(obj);
        }
    });

    modifier.$set.disease = items;
});
