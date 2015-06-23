// Before
//Dental.Collection.Register.before.insert(function (userId, doc) {
//    doc.createdAt = Date.now();
//});

//Dental.Collection.Register.before.insert(function (userId, doc) {
//    var items = [];
//
//    _.each(doc.items, function (obj) {
//        if (!_.isNull(obj)) {
//            var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
//            obj._item = itemDoc;
//
//            items.push(obj);
//        }
//    });
//
//    doc.items = items;
//});

Dental.Collection.Register.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    var items = [];

    _.each(modifier.$set.disease, function (obj) {
        if (!_.isNull(obj)) {
            items.push(obj);
        }
    });

    modifier.$set.disease = items;
});
