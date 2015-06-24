Router.route('dental/invoiceReport', function () {
    this.render('dental_invoiceReport');
}, {
    name: 'dental.invoiceReport',
    header: {title: 'Invoice Report', sub: '', icon: 'file-text-o'},
    title: "Invoice Report"
});

Router.route('dental/invoiceReportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini | Orientation: portrait, landscape
        data: {
            pageSize: 'a5',
            orientation: 'portrait'
        }
    });

    var q = this.params.query;
    this.render('dental_invoiceReportGen', {
        data: function () {
            return q;
        }
    });
});
