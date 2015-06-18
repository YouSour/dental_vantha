Router.route('clinic/invoice', function () {
    this.render('clinic_invoice');
}, {
    name: 'clinic.invoice',
    header: {title: 'invoice', sub: '', icon: 'fa-file-text'},
    title: 'Invoice',
    waitOn: function () {

    }
});