/************ Form *************/
Template.dental_analysisPatientListReport.onCreated(function() {
  createNewAlertify('exchange');
});

Template.dental_analysisPatientListReport.onRendered(function() {
  var name = $('[name="date"]');
  DateTimePicker.dateRange(name);
});

Template.dental_analysisPatientListReport.events({
  'click .exchangeAddon': function(e, t) {
    alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
  }

});

/************ Generate *************/
Template.dental_analysisPatientListReportGen.helpers({
  data: function() {
    var self = this;
    var callId = JSON.stringify(self);
    var call = Meteor.callAsync(callId, 'dental_analysisPatientList',
      self);

    if (!call.ready()) {
      return false;
    }

    return call.result();
  },
  extract: function(typeOfPatient, male, female) {
    var data = ReactiveMethod.call('extractTypeOfPatient', typeOfPatient,
      male, female); //call extractTypeOfPatient function
    return data;
  }
});
