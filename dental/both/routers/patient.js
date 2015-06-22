Router.route('dental/patient', function () {

    this.render('dental_patient');

}, {
    name: 'dental.patient',
    header: {title: 'Patient', sub: '', icon: 'fa fa-wheelchair'},
    title: "Patient"
});