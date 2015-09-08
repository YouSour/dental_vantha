Dental.Collection.SpecialRegister.before.insert(function (userId, doc) {
    var index = 1;
    doc.paymentMethod.forEach(function (obj) {
        obj.index = index;
        index += 1;
    });

    return doc;
});

Dental.Collection.SpecialRegister.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    if (!_.isUndefined(modifier.$set.paymentMethod)) {
        var index = 1;
        modifier.$set.paymentMethod.forEach(function (obj) {
            obj.index = index;
            index += 1;
        });

        return modifier;
    }
});
