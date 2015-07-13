Router.route('dental/calendar', function () {

    this.render('dental_calendar');

}, {
    name: 'dental.calendar',
    header: {title: 'Calendar', sub: '', icon: 'calendar-o'},
    title: "Calendar"
});