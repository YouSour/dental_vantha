// Before
Dental.Collection.OrderCategory.before.insert(function (userId, doc) {
    doc.createdAt = new  Date();
});

Dental.Collection.OrderCategory.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = new Date();
});
