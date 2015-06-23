Router.route('dental/purchase', function () {
        this.render('dental_purchase');
    }, {
        name: 'dental.purchase',
        header: {title: 'purchase', sub: '', icon: 'fa fa-cart-plus'},
        title: "Purchase",
        waitOn: function () {
            return Meteor.subscribe('dental_purchase');
        }
    }
);