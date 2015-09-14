// Publication
Meteor.publish('dental_calendarEvent', function () {
    if (this.userId) {
        return Dental.Collection.CalendarEvent.find();
    }
});