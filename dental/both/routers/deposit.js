Router.route('dental/deposit', function () {
        this.render('dental_deposit');
    }, {
        name: 'dental.deposit',
        header: {title: 'deposit', sub: '', icon: 'fa fa-credit-card'},
        title: "Deposit",
        waitOn: function () {
            return Meteor.subscribe('dentalDeposit');
        }
    }
);