Router.route('dental/expenseType', function () {
    this.render('dental_expenseType');
}, {
    name: 'dental.expenseType',
    header: {title: 'expenseType', sub: '', icon: 'fa fa-hospital-o'},
    title: 'ExpenseType',
    waitOn: function () {
        return Meteor.subscribe('dentalExpenseType');
    }

});