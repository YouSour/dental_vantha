Router.route('dental/backup', function () {
    this.render('dental_backup');
}, {
    name: 'dental.backup',
    header: {title: 'Backup', sub: '', icon: 'files-o'},
    title:'dental-backup'
});