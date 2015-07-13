/*
 * Full calendar
 */
Template.dental_calendar.onRendered(function () {
    Dental.Collection.Calendar.find({}).observeChanges({

        added: function (id, fields) {
            console.log('Calendar is added');
            $('#myFullcalendar').fullCalendar('refetchEvents');
        },

        changed: function (id, fields) {
            console.log('Calendar is changed');
            $('#myFullcalendar').fullCalendar('refetchEvents');
        },

        removed: function (id) {
            console.log('Calendar is removed');
            $('#myFullcalendar').fullCalendar('refetchEvents');
        }

    });
});

Template.dental_calendar.helpers({
    options: function () {
        return {
            dayClick: function (date, jsEvent, view) {

                alert('Clicked on: ' + date.format());

                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

                alert('Current view: ' + view.name);

                // change the day's background color just for fun
                $(this).css('background-color', 'red');

            },

            eventClick: function (calEvent, jsEvent, view) {

                alert('Event ID: ' + calEvent._id);
                alert('Event Title: ' + calEvent.title);
                alert('Event Start: ' + calEvent.start);
                alert('Event End: ' + calEvent.end);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);

                // change the border color just for fun
                $(this).css('border-color', 'red');

            },


            events: function (start, end, tz, callback) {
                var events = Dental.Collection.Calendar.find().map(function (obj) {
                    return {
                        id: obj._id,
                        title: obj.title,
                        start: obj.start
                        //end: obj.end
                        //allDay: true
                    };
                });

                callback(events);
            },


            defaultView: 'agendaWeek',
            firstDay: 1,
            height: "100%",
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },

            editable: true,
            eventDragStop: function (event, jsEvent, ui, view) {
                alert('Event ID: ' + calEvent._id);
                alert('Event Title: ' + calEvent.title);
                alert('Event Start: ' + calEvent.start);
                alert('Event End: ' + calEvent.end);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);
            }
        }
    }
});
