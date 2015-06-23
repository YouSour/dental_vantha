Router.route('dental/doctor', function () {

    this.render('dental_doctor');

}, {
    name: 'dental.doctor',
    header: {title: 'Doctor', sub: '', icon: 'list'},
    title: "Doctor"
});