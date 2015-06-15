Router.route('clinic/disease', function () {

    this.render('clinic_disease');

}, {
    name: 'clinic.disease',
    header: {title: 'Disease', sub: '', icon: 'fa fa-stethoscope'},
    title: "Disease",
    waitOn: function () {
        return Meteor.subscribe('clinicDisease');
    }
});