Template.dental_treatmentInfo.helpers({
    data: function () {
        var self = this;
        var getData = Dental.Collection.Treatment.find({registerId: self.registerId});

        return getData;
    }
});