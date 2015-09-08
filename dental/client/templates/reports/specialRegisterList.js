/************ Form *************/

Template.dental_specialRegisterListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_specialRegisterListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_specialRegisterList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});