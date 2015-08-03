Dental.Collection.MaterialCostItem.before.insert(function(userId,doc){
   doc.createdAt = new Date();
});

Dental.Collection.MaterialCostItem.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = new Date();

});