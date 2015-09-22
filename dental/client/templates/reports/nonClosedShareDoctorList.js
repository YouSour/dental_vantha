/************ Form *************/
Template.dental_nonClosedShareDoctorListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_nonClosedShareDoctorListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_nonClosedShareDoctorListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_nonClosedShareDoctorListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_nonClosedShareDoctor',
            self);

        if (!call.ready()) {
            return false;
        }
        return call.result();

    }
});
