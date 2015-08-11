Router.route('dental/restore', function () {
    this.render('dental_restore');
}, {
    name: 'dental.restore',
    header: {title: 'restore', sub: '', icon: 'files-o'},
    title:'dental-restore'
});