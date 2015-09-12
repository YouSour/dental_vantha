Dental.Collection.SpecialPayment.cacheDoc(
    'patient',
    Dental.Collection.Patient,
    ['name', 'gender', 'age', 'occupation', 'address', 'history', 'member', 'telephone', 'photo']
);

Dental.Collection.SpecialPayment.cacheDoc('staff', Dental.Collection.Staff, ['name', 'gender', 'position', 'startDate', 'address'], {
    refField: "staffId"
});

Dental.Collection.SpecialPayment.cacheDoc('specialRegister', Dental.Collection.SpecialRegister, ['subTotal', 'deposit', 'subDiscount', 'total','doctorShareTotal','laboExpenseTotal','disease','paymentMethod','paymentMethodTotal', 'registerDate', 'des', 'status', 'closingDate']);