Router.route('clinic/deposit', function () {
        this.render('clinic_deposit');
    }, {
        name: 'clinic.deposit',
        header: {title: 'deposit', sub: '', icon: 'fa fa-credit-card'},
        title: "Deposit",
        waitOn: function () {
            return Meteor.subscribe('clinicDeposit');
        }
    }
);