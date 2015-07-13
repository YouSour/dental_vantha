// Collection
Dental.Collection.Calendar = new Mongo.Collection('dental_calendar');

// Schema
Dental.Schema.Calendar = new SimpleSchema({
    title: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date,
        optional: true
    },
    data: {
        type: Object,
        blackbox: true,
        optional: true
    }
});

// Attach schema
Dental.Collection.Calendar.attachSchema(Dental.Schema.Calendar);