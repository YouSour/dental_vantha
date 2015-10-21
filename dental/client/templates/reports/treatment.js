Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_treatmentReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_treatmentReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_treatmentReport.events({
    'change .patient': function (e) {
        var patientId = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patientId);
    }
});

/************ Generate *************/
Template.dental_treatmentReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_treatment', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
