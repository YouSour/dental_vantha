/************ Form *************/
Template.dental_quotationReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

/************ Generate *************/
Template.dental_quotationReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_quotation', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();

    }
});
