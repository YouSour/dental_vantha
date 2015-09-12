/************ Generate *************/
Template.dental_purchaseReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_purchase', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();

    }
});
