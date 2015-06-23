// Before
Dental.Collection.Doctor.before.insert(function (userId, doc) {
    doc.createdAt = new  Date();
});

Dental.Collection.Doctor.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = new Date();
});
