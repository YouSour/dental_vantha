Router.route('dental/patient', function () {

    this.render('dental_patient');

}, {
    name: 'dental.patient',
    title: "Patient",
    header: {title: 'Patient', sub: '', icon: 'fa fa-wheelchair'},
    breadcrumb: {title: 'Patient', parent: 'dental.home'}
});