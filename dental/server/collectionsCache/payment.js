Dental.Collection.Payment.cacheDoc(
    'patient',
    Dental.Collection.Patient,
    ['name', 'gender', 'age', 'occupation', 'address', 'history', 'member','telephone', 'photo']
);

Dental.Collection.Payment.cacheDoc('staff', Dental.Collection.Staff, ['name','gender','position','startDate','address'], {
    refField: "staffId"
});