Router.route('dental/invoice', function () {
    this.render('dental_invoice');
}, {
    name: 'dental.invoice',
    header: {title: 'invoice', sub: '', icon: 'fa-file-text'},
    title: 'Invoice',
    waitOn: function () {

    }
});