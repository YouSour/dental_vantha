Router.route('clinic/home', function () {

    this.render('clinic_home');

}, {
    name: 'clinic.home',
    header: {title: 'home', sub: '', icon: 'home'},
    title: "Home"
});
