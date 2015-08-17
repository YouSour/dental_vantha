Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_invoiceReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_invoiceReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_invoiceReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    },
    'change .patientId': function (e, t) {
        var patientId = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patientId);
    }

});

/************ Generate **** *********/
Template.dental_invoiceReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId,'dental_invoice',self);

        if(!call.ready()){
            return false;
        }

        return call.result();
    }
});
