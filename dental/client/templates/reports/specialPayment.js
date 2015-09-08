/************ Generate **** *********/
Template.dental_specialPaymentReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId,'dental_specialPayment',self);

        if(!call.ready()){
            return false;
        }

        return call.result();
    }
});
