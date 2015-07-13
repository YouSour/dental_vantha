//Meteor.startup(function () {
//    Dental.Collection.Calendar.find({}).observeChanges({
//
//        added: function (id, fields) {
//            $('#fullcalendar').fullCalendar('refetchEvents');
//        },
//
//        changed: function (id, fields) {
//            $('#fullcalendar').fullCalendar('refetchEvents');
//        },
//
//        removed: function (id) {
//            $('#fullcalendar').fullCalendar('refetchEvents');
//        }
//
//    });
//});