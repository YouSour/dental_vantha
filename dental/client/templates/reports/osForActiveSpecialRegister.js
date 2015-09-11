/************ Form *************/
Template.dental_osForActiveSpecialRegisterReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_osForActiveSpecialRegisterReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_osForActiveSpecialRegisterReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_osForActiveSpecialRegisterReportGen.helpers({
    data: function () {
        var callId = JSON.stringify(this);
        var call = Meteor.callAsync(callId, 'dental_osForActiveSpecialRegisterReport', this);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});

