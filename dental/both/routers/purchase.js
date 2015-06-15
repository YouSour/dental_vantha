Router.route('clinic/purchase', function () {
        this.render('clinic_purchase');
    }, {
        name: 'clinic.purchase',
        header: {title: 'purchase', sub: '', icon: 'fa fa-cart-plus'},
        title: "Purchase",
        waitOn: function () {
            return Meteor.subscribe('clinicPurchase');
        }
    }
);