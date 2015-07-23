Dental.Collection.Quotation.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    var diseases = [];

    _.each(modifier.$set.disease, function (obj) {
        if (!_.isNull(obj)) {
            diseases.push(obj);
        }
    });

    modifier.$set.disease = diseases;
});

