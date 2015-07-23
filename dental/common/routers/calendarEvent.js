Router.route('dental/calendarEvent', function () {

    this.render('dental_calendarEvent');

}, {
    name: 'dental.calendarEvent',
    title: "Calendar Event",
    header: {title: 'Calendar Event', sub: '', icon: 'calendar'},
    breadcrumb: {title: 'Calendar Event', parent: 'dental.home'}
});
