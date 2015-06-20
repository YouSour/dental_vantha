Router.route('dental/patient', function () {

    this.render('dental_patient');

}, {
    name: 'dental.patient',
    header: {title: 'patient', sub: '', icon: 'fa fa-wheelchair'},
    title: "Patient",
    waitOn: function () {
        return Meteor.subscribe('dentalPatient');
    }
});