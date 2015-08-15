Dental.Collection.Register.before.insert(function(userId,doc){
   //doc.createdAt = new Date();
   doc.status = "Active";
   doc.closingDate = "";
});

//Dental.Collection.Register.before.update(function (userId, doc, fieldNames, modifier, options) {
//    modifier.$set = modifier.$set || {};
//    modifier.$set.updatedAt = new Date();
//});
