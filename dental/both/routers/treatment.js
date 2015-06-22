Router.route('dental/treatment', function () {
    this.render('dental_treatment');
}, {
    name: 'dental.treatment',
    header: {title: 'Treatment', sub: '', icon: 'medkit'},
    title: "Treatment"
});