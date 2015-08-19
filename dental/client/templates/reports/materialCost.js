/************ Generate *************/
Template.dental_materialCostReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_materialCost', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();

    }
});
