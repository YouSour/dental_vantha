Router.route('clinic/expenseType', function () {
    this.render('clinic_expenseType');
}, {
    name: 'clinic.expenseType',
    header: {title: 'expenseType', sub: '', icon: 'fa fa-hospital-o'},
    title: 'ExpenseType',
    waitOn: function () {
        return Meteor.subscribe('clinicExpenseType');
    }

});