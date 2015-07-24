Router.route('dental/registerOutstandingListReport', function () {
    this.render('dental_registerOutstandingListReport');
}, {
    name: 'dental.registerOutstandingListReport',
    title: "Register Outstanding List Report",
    header: {title: 'Register Outstanding Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Register Outstanding Report', parent: 'dental.home'}
});

Router.route('dental/registerOutstandingListReportGen', function () {
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
    this.render('dental_registerOutstandingListReportGen', {
        data: function () {
            return q;
        }
    });
});
