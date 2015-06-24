// Before
Dental.Collection.DiseaseItem.before.insert(function (userId, doc) {
    doc.createdAt = new  Date();
});

Dental.Collection.DiseaseItem.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = new Date();
});
