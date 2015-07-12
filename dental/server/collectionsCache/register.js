// Collection
Dental.Collection.Register.cacheDoc(
    'patient',
    Dental.Collection.Patient,
    ['name', 'gender', 'age', 'occupation', 'address', 'history', 'member', 'photo']
);

Dental.Collection.Register.cacheCount('treatmentCount', Dental.Collection.Treatment, 'registerId');
Dental.Collection.Register.cacheCount('depositCount', Dental.Collection.Deposit, 'registerId');
Dental.Collection.Register.cacheCount('invoiceCount', Dental.Collection.Invoice, 'registerId');

