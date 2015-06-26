Router.route('dental/payment', function () {
    this.render('dental_payment');
}, {
    name: 'dental.payment',
    header: {title: 'payment', sub: '', icon: "fa fa-credit-card"},
    title: 'Payment'
});