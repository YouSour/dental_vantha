Router.route('dental/diseaseHistory', function () {
    this.render('dental_diseaseHistory');
}, {
    name: 'dental.diseaseHistory',
    title: "Disease History",
    header: {title: 'Disease History', sub: '', icon: ''},
    breadcrumb: {title: 'Disease History', parent: 'dental.home'}
});