Router.route('dental/closedInvoiceListReport', function () {
    this.render('dental_closedInvoiceListReport');
}, {
    name: 'dental.closedInvoiceListReport',
    title: "Closed Invoice Report",
    header: {title: 'Closed Invoice Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'closed Invoice  Report', parent: 'dental.home'}
});

Router.route('dental/closedInvoiceListReportGen', function () {
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
    this.render('dental_closedInvoiceListReportGen', {
        data: function () {
            return q;
        }
    });
});
