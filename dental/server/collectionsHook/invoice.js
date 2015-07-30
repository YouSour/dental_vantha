Dental.Collection.Invoice.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    // Check disease item
    if (modifier.$set.disease) {
        var disease = [];

        _.each(modifier.$set.disease, function (obj) {
            if (!_.isNull(obj)) {
                disease.push(obj);
            }
        });
        modifier.$set.disease = disease;
    }

    // Check doctor share
    if (modifier.$set.doctorShare) {
        var doctorShare = [];

        _.each(modifier.$set.doctorShare, function (obj) {
            if (!_.isNull(obj)) {
                doctorShare.push(obj);
            }
        });
        modifier.$set.doctorShare = doctorShare;
    }
});
