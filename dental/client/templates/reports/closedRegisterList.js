/************ Form *************/

Template.dental_closedRegisterListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_closedRegisterListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_closedRegisterList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});