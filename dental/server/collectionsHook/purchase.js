// Before
Dental.Collection.Purchase.before.insert(function (userId, doc) {
    doc.createdAt = new  Date();
});

Dental.Collection.Purchase.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = new Date();
    var items = [];

    _.each(modifier.$set.items, function (obj) {
        if (!_.isNull(obj)) {
            items.push(obj);
        }
    });

    modifier.$set.items = items;
});

