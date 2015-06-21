// Before
//Dental.Collection.Register.before.insert(function (userId, doc) {
//    doc.createdAt = Date.now();
//});

//Dental.Collection.Register.before.update(function (userId, doc, fieldNames, modifier, options) {
//    console.log('before update');
//
//    modifier.$set = modifier.$set || {};
//    var items = [];
//
//    _.each(modifier.$set.disease, function (obj) {
//        if (!_.isNull(obj)) {
//            items.push(obj);
//        }
//    });
//
//    modifier.$set.disease = items;
//});
