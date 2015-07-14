// Collection
Dental.Collection.CalendarEvent = new Mongo.Collection('dental_calendarEvent');

// Schema
Dental.Schema.CalendarEvent = new SimpleSchema({
    registerId: {
        type: String
    },
    start: {
        type: String,
        label: 'Event date',
        defaultValue: function () {
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }
    },
    end: {
        type: String,
        optional: true
    },
    title: {
        type: String,
        max: 500
    },
    branchId: {
        type: String
    }
});

// Attach schema
Dental.Collection.CalendarEvent.attachSchema(Dental.Schema.CalendarEvent);