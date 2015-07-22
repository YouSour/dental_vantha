Dental.Collection.Payment.cacheDoc('invoice', Dental.Collection.Invoice, ['patientId', 'registerId', 'invoiceDate', 'disease', 'subTotal', 'deposit', 'subDiscount', 'total', 'doctorShare', "_register"], {
    refField: "invoiceId"
});

Dental.Collection.Payment.cacheDoc('staff', Dental.Collection.Staff, ['name','gender','position','startDate','address'], {
    refField: "staffId"
});