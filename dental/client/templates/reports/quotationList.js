/************ Form *************/
Template.dental_quotationListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_quotationListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_quotationListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_quotationListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_quotationList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
