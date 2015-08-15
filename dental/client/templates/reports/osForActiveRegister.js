/************ Form *************/
Template.dental_osForActiveRegisterReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_osForActiveRegisterReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_osForActiveRegisterReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_osForActiveRegisterReportGen.helpers({
    data: function () {
        var callId = JSON.stringify(this);
        var call = Meteor.callAsync(callId, 'dental_osForActiveRegisterReport', this);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});

