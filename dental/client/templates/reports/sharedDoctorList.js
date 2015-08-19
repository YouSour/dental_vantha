/************ Form *************/
Template.dental_sharedDoctorListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_sharedDoctorListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_sharedDoctorListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }

});

/************ Generate *************/
Template.dental_sharedDoctorListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_sharedDoctor', self);

        if (!call.ready()) {
            return false;
        }
        return call.result();

    }
});