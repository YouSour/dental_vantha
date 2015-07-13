// Publication
Meteor.publish('dental_calendar', function () {
    if (this.userId) {
        return Dental.Collection.Calendar.find();
    }
});