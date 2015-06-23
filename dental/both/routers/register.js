Router.route('dental/register', function () {
    this.render('dental_register');
}, {
    name: "dental.register",
    header: {title: "Register", sub: "", icon: "list"},
    title: "Register"
});