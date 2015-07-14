Dental.TabularTable.CalendarEvent = new Tabular.Table({
    name: "dentalCalendarEventList",
    collection: Dental.Collection.CalendarEvent,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_calendarEventAction},
        {data: "title", title: "Title"},
        {data: "start", title: "Event Date"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", "targets": 0}]
});