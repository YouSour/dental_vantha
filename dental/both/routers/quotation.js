Router.route('dental/quotation', function () {
        this.render('dental_quotation');
    }, {
        name: 'dental.quotation',
        header: {title: 'quotation', sub: '', icon: 'list'},
        title: 'Quotation'
    }
);