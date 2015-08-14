Router.route('dental/registerClosedListReport', function () {
    this.render('dental_registerClosedListReport');
}, {
    name: 'dental.registerClosedListReport',
    title: "Register Closed Report",
    header: {title: 'Register Closed Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Register Closed Report', parent: 'dental.home'}
});

Router.route('dental/registerClosedListReportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'landscape',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_registerClosedListReportGen', {
        data: function () {
            return q;
        }
    });
});
