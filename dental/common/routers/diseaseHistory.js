Router.route('dental/diseaseHistory', function () {
    this.render('dental_diseaseHistory');
}, {
    name: 'dental.diseaseHistory',
    title: "Patient History",
    header: {title: 'Patient History', sub: '', icon: 'list'},
    breadcrumb: {title: 'Patient History', parent: 'dental.home'}
});