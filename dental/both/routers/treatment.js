Router.route('dental/treatment', function () {
        this.render('dental_treatment');
    }, {
        name: 'dental.treatment',
        header: {title: 'treatment', sub: '', icon: 'medkit'},
        title: "Treatment",
        waitOn: function () {
            return Meteor.subscribe('dentalTreatment');
        }
    }
);