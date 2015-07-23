/*
 * Full calendar
 */
Template.dental_calendar.onRendered(function () {
    createNewAlertify('calendarEvent');

    Dental.Collection.CalendarEvent.find({}).observeChanges({

        added: function (id, fields) {
            console.log('Calendar is added');
            $('#dental_fullcalendar').fullCalendar('refetchEvents');
        },

        changed: function (id, fields) {
            console.log('Calendar is changed');
            $('#dental_fullcalendar').fullCalendar('refetchEvents');
        },

        removed: function (id) {
            console.log('Calendar is removed');
            $('#dental_fullcalendar').fullCalendar('refetchEvents');
        }

    });
});

Template.dental_calendar.helpers({
    options: function () {
        return {
            //dayClick: function (date, jsEvent, view) {
            //
            //    //alert('Clicked on: ' + date.format());
            //    //
            //    //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            //    //
            //    //alert('Current view: ' + view.name);
            //    var calendarEventDate = $('[name="start"]');
            //    DateTimePicker.dateTime(calendarEventDate);
            //
            //    var data = {};
            //    data.registerOpt = Dental.List.register;
            //
            //    data.startVal = moment(date.format()).format('YYYY-MM-DD HH:mm:ss');
            //
            //    alertify.calendarEvent(fa("plus", "Calendar Event"), renderTemplate(Template.dental_calendarEventInsertOnFullcalendar, data));
            //},

            eventClick: function (calEvent, jsEvent, view) {
                var data = Dental.Collection.CalendarEvent.findOne({_id: calEvent._id});

                alertify.calendarEvent(fa("pencil", "Calendar Event"), renderTemplate(Template.dental_calendarEventUpdate, data));
            },


            events: function (start, end, tz, callback) {
                var events = Dental.Collection.CalendarEvent.find().map(function (obj) {
                    var title = function () {
                        return obj._register._patient.name + ' (' + obj.title + ')';
                    };
                    var start = moment(obj.start).toDate();

                    return {
                        id: obj._id,
                        title: title(),
                        start: start
                        //end: obj.end
                        //allDay: true
                    };
                });

                callback(events);
            },

            id: 'dental_fullcalendar',
            defaultView: 'agendaWeek',
            firstDay: 1,
            height: "100%",
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true
        }
    }
});
