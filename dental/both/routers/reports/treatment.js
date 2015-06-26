Router.route('dental/treatmentReport', function () {
    this.render('dental_treatmentReport');
}, {
    name: 'dental.treatmentReport',
    header: {title: 'Treatment Report', sub: '', icon: 'file-text-o'},
    title: "Treatment Report"
});

Router.route('dental/treatmentReportGen', function () {
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
    this.render('dental_treatmentReportGen', {
        data: function () {
            return q;
        }
    });
});
