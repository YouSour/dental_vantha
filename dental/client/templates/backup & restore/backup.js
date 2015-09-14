function getBackupType(type) {
    var settingType = [
        'Cpanel.Collection.Currency',
        'Cpanel.Collection.Branch',
        'Cpanel.Collection.Company',
        'Cpanel.Collection.Setting',
        'Cpanel.Collection.Currency',
        'Events',
        'Meteor.roles',
        //files

        'Dental.Collection.DiseaseHistory',
        'Dental.Collection.DiseaseCategory',
        'Dental.Collection.DiseaseItem',
        'Dental.Collection.MaterialCostCategory',
        'Dental.Collection.MaterialCostItem',
        'Dental.Collection.OrderCategory',
        'Dental.Collection.OrderItem',

        //'Dental.Collection.SubCategories',
        //'Dental.Collection.Units',
        //'Dental.Collection.Products',
        'Meteor.users'
    ];
    var defaultType = [
        'Dental.Collection.CalendarEvent',
        'Dental.Collection.Doctor',
        'Dental.Collection.Laboratory',
        'Dental.Collection.Deposit',
        'Dental.Collection.MaterialCost',
        'Dental.Collection.Patient',
        'Dental.Collection.Payment',
        'Dental.Collection.Purchase',
        'Dental.Collection.Quotation',
        'Dental.Collection.Register',
        'Dental.Collection.Staff',
        'Dental.Collection.Supplier',
        'Dental.Collection.Treatment'
        //Dental.Collection.
    ];

    if (type == 'Setting') {
        return settingType;
    } else if (type == 'Default') {
        return defaultType;
    } else {
        return defaultType.concat(settingType);
    }
}
AutoForm.hooks({
    dental_backup: {
        onSubmit: function (doc) {
            debugger;
            var backupType = doc.backupType;
            var collections = getBackupType(backupType);
            var module = Session.get('currentModule');
            backup(module,"branchId",backupType,collections,doc.branch);

            return false;
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});