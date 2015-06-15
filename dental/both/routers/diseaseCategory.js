Router.route('clinic/diseaseCategory', function () {

    this.render('clinic_diseaseCategory');

}, {
    name: 'clinic.diseaseCategory',
    header: {title: 'diseaseCategory', sub: '', icon: 'fa fa-stethoscope'},
    title: "diseaseCategory",
    waitOn: function () {
        return Meteor.subscribe('clinicDiseaseCategory');
    }
});