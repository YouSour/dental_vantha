Router.route('dental/expense', function () {
    this.render('dental_expense');
}, {
    name: "dental.expense",
    header: {title: "Expense", sub: "", icon: "fa fa-hospital-o"},
    title: "Expense",
    waitOn: function () {
        return Meteor.subscribe('dentalExpense');
    }
});