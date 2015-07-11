Dental.Collection.Purchase.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    var items = [];

    _.each(modifier.$set.items, function (obj) {
        if (!_.isNull(obj)) {
            items.push(obj);
        }
    });

    modifier.$set.items = items;
});

