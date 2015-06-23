Router.route('dental/home', function () {

    this.render('dental_home');

}, {
    name: 'dental.home',
    header: {title: 'home', sub: '', icon: 'home'},
    title: "Home"
});
