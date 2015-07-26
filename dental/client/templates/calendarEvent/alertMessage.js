var state = new ReactiveObj();

Template.dental_alertEventMsg.onRendered(function () {
    //$('.menu').slimScroll({
    //    height: '100%'
    //});

    Meteor.setInterval(function () {
        var data = appointmentEvent();

        state.set('data', data);
    }, 1000);
});


Template.dental_alertEventMsg.helpers({
    data: function () {
        console.log(state.get('data'));

        return state.get('data');
    }
});

Template.dental_alertEventMsg.events({
    'click .eventItem': function () {
        var data = Dental.Collection.CalendarEvent.findOne(this._id);
        data.patientPhoto = null;
        if (!_.isUndefined(data._register._patient.photo)) {
            var image = Files.findOne(data._register._patient.photo).url();
            data.patientPhoto = image;
        }

        // Update status
        Dental.Collection.CalendarEvent.update({_id: this._id}, {$set: {status: 'Disable'}});

        alertify.alert(fa("eye", "Calendar Event"), renderTemplate(Template.dental_calendarEventShow, data));
    }
});

// Count event
function appointmentEvent(alertDate, endDate) {
    var data = {};

    var currentDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    var doc = Dental.Collection.CalendarEvent.find({start: {$lt: currentDate}, status: 'Enable'});

    if (doc.count() > 0) {
        data.count = doc.count();

        var event = [];
        doc.forEach(function (obj) {
            obj.patientPhoto = null;
            if (!_.isUndefined(obj._register._patient.photo)) {
                var image = Files.findOne(obj._register._patient.photo).url();
                obj.patientPhoto = image;
            }

            event.push(obj);
        });
        data.event = event;
    }

    return data;
}

