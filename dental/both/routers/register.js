Router.route('dental/register', function () {
    this.render('dental_register');
}, {
    name: "dental.register",
    header: {title: "register", sub: "", icon: "fa fa-list-alt"},
    title: "Register",
    waitOn: function () {
        return Meteor.subscribe('dentalRegister');
    }
});