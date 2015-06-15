Router.route('clinic/expense', function () {
    this.render('clinic_expense');
}, {
    name: "clinic.expense",
    header: {title: "Expense", sub: "", icon: "fa fa-hospital-o"},
    title: "Expense",
    waitOn: function () {
        return Meteor.subscribe('clinicExpense');
    }
});