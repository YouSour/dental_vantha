Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_depositReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_depositReport.events({
    'change .patient': function (e) {
        var patient = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patient);
    }
});

/************ Generate *************/
Template.dental_depositReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId,'dental_deposit',self);

        if(!call){
            return false;
        }

        return call.result();
    }
});
