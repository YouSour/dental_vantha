Router.route('clinic/treatment', function () {
        this.render('clinic_treatment');
    }, {
        name: 'clinic.treatment',
        header: {title: 'treatment', sub: '', icon: 'medkit'},
        title: "Treatment",
        waitOn: function () {
            return Meteor.subscribe('clinicTreatment');
        }
    }
);