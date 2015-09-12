/************ Form *************/
Template.dental_diseaseListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_diseaseListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_diseaseListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }

});

/************ Generate *************/
Template.dental_diseaseListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_diseaseList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});