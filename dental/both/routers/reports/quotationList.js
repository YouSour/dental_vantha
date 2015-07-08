Router.route('dental/quotationListReport', function () {
    this.render('dental_quotationListReport');
}, {
    name: 'dental.quotationListReport',
    header: {title: 'Quotation List Report', sub: '', icon: 'file-text-o'},
    title: "Quotation List Report"
});

Router.route('dental/quotationListReportGen', function () {
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
    this.render('dental_quotationListReportGen', {
        data: function () {
            return q;
        }
    });
});
