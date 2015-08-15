/************ Form *************/
Template.dental_osForClosingRegisterReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_osForClosingRegisterReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_osForClosingRegisterReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_osForClosingRegisterReportGen.helpers({
    data: function () {
        var callId = JSON.stringify(this);
        var call = Meteor.callAsync(callId, 'dental_osForClosingRegisterReport', this);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});

