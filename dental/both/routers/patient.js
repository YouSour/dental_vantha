Router.route('clinic/patient', function () {

    this.render('clinic_patient');

}, {
    name: 'clinic.patient',
    header: {title: 'patient', sub: '', icon: 'fa fa-wheelchair'},
    title: "Patient",
    waitOn: function () {
        return Meteor.subscribe('clinicPatient');
    }
});