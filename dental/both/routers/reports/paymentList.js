Router.route('dental/paymentListReport', function () {
    this.render('dental_paymentListReport');
}, {
    name: 'dental.paymentListReport',
    header: {title: 'Payment Report', sub: '', icon: 'file-text-o'},
    title: "Quotation List Report"
});

Router.route('dental/paymentListReportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_paymentListReportGen', {
        data: function () {
            return q;
        }
    });
});
