/**
 * Staff
 */

Meteor.publish('dental_staff', function () {
    if (this.userId) {
        return Dental.Collection.Staff.find();
    }
});

/**
 * Doctor
 */

Meteor.publish('dental_doctor', function () {
    if (this.userId) {
        return Dental.Collection.Doctor.find();
    }
});

/**
 * Disease Category
 */

Meteor.publish('dental_diseaseCategory', function () {
    if (this.userId) {
        return Dental.Collection.DiseaseCategory.find();
    }
});

/**
 * Disease Item
 */

Meteor.publish('dental_diseaseItem', function () {
    if (this.userId) {
        return Dental.Collection.DiseaseItem.find();
    }
});

/**
 * Patient
 */

Meteor.publish('dental_patient', function () {
    if (this.userId) {
        return Dental.Collection.Patient.find();
    }
});

/*
 *Supplier
 */
Meteor.publish('dental_supplier', function () {
    return Dental.Collection.Supplier.find();
});

/*
 * Order Category
 */
Meteor.publish('dental_orderCategory', function () {
    return Dental.Collection.OrderCategory.find();
});

/*
 *Order Item
 */

Meteor.publish('dental_orderItem', function () {
    return Dental.Collection.OrderItem.find();
});
/*
 *Register
 */
Meteor.publish('dental_register', function () {
    return Dental.Collection.Register.find();
});

/*
 * Treatment
 */
Meteor.publish('dental_treatment', function () {
    return Dental.Collection.Treatment.find();
});

/*
 * Deposit
 */
Meteor.publish('dental_deposit', function () {
    return Dental.Collection.Deposit.find();
});

/*
 * Invoice
 */
Meteor.publish('dental_invoice', function () {
    return Dental.Collection.Invoice.find();
});

/*
 * Purchase
 */
Meteor.publish('dental_purchase', function () {
    return Dental.Collection.Purchase.find();
});