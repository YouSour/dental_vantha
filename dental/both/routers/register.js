Router.route('clinic/register', function () {
    this.render('clinic_register');
}, {
    name: "clinic.register",
    header: {title: "register", sub: "", icon: "fa fa-list-alt"},
    title: "Register",
    waitOn: function () {
        return Meteor.subscribe('clinicRegister');
    }
});