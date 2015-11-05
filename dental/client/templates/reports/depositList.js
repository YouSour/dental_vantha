/************ Form *************/
Template.dental_depositListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_depositListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_depositListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_depositListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_depositList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});