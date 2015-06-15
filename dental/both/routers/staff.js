Router.route('clinic/staff', function () {

    this.render('clinic_staff');

}, {
    name: 'clinic.staff',
    header: {title: 'staff', sub: '', icon: 'user-plus'},
    title: "Staff",
    waitOn: function () {
        return Meteor.subscribe('clinicStaff');
    }
});