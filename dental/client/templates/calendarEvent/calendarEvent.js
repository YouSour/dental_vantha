/*
 * Index
 */
Template.dental_calendarEvent.onCreated(function() {
  createNewAlertify('calendarEvent');
});

Template.dental_calendarEvent.helpers({
  register: function() {
    return Dental.RegisterState.get('data');
  },
  selector: function() {
    var registerId = Dental.RegisterState.get('data')._id;

    return {
      registerId: registerId
    };
  },
  registerOpt: function() {
    return Dental.List.register();
  }
});

Template.dental_calendarEvent.events({
  'click .insert': function() {
    Session.set('closeAppointment', true);
    var data = Dental.RegisterState.get('data');
    alertify.calendarEvent(fa("plus", "Calendar Event"), renderTemplate(
      Template.dental_calendarEventInsert, data));
  },
  'click .update': function() {
    var data = this;
    alertify.calendarEvent(fa("pencil", "Calendar Event"), renderTemplate(
      Template.dental_calendarEventUpdate, data));
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Calendar Event"),
      "Are you sure to delete [" + self._id + "]?",
      function() {
        Dental.Collection.CalendarEvent.remove(self._id, function(error) {
          if (error) {
            alertify.error(error.message);
          } else {
            alertify.success("Success");
          }
        });
      },
      null
    );
  },
  'click .show': function() {
    var data = this;
    data.patientPhoto = null;
    if (!_.isUndefined(data._register._patient.photo)) {
      var image = Files.findOne(data._register._patient.photo).url();
      data.patientPhoto = image;
    }

    alertify.alert(fa("eye", "Calendar Event"), renderTemplate(Template.dental_calendarEventShow,
      data));
  }
});

/**
 * Insert
 */
Template.dental_calendarEventInsert.onRendered(function() {
  datepicker();
});

/**
 * Update
 */
Template.dental_calendarEventUpdate.onRendered(function() {
  datepicker();
});

/*
 *Hook
 */
AutoForm.hooks({
  dental_calendarEventInsert: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        var prefix = doc.branchId + '-';
        Meteor.call('dental', prefix);
        return doc;


      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closeAppointment')) {
        alertify.calendarEvent().close();
      }
      //clear select2
      $('select').each(function() {
        $(this).select2("val", "");
      });

      alertify.success("Success");
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_calendarEventUpdate: {
    onSuccess: function(formType, result) {
      alertify.calendarEvent().close();
      alertify.success("Success");
    },
    onError: function(fromType, error) {
      alertify.error(error.message);
    }
  }
});

/*
 *Config date picker
 */
var datepicker = function() {
  var calendarEventDate = $('[name="start"]');
  DateTimePicker.dateTime(calendarEventDate);
};
