Router.route('dental/treatmentDescriptionGen', function() {
  // Config layout
  this.layout('reportLayout', {
    // Page size: a4, a5, mini
    // Orientation: portrait, landscape
    // Font size: fontBody: undefined (10px), bg (12px)
    data: {
      pageSize: '',
      orientation: 'portrait',
      fontBody: 'bg'
    }
  });

  var q = this.params.query;
  this.render('dental_treatmentDescription', {
    data: function() {
      return q;
    }
  });
}, {
  name: 'dental.treatmentDescriptionGen'
});
