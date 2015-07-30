Dental.Collection.Quotation.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    if (modifier.$set.disease) {
        var disease = [];

        _.each(modifier.$set.disease, function (obj) {
            if (!_.isNull(obj)) {
                disease.push(obj);
            }
        });

        modifier.$set.disease = disease;
    }
});

