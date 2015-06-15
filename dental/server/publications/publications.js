/**
 * Customer
 */
//Meteor.publish('sampleCustomer', function () {
//    if (this.userId) {
//        return Sample.Collection.Customer.find();
//    }
//});

/**
 * Staff
 */

Meteor.publish('clinicStaff', function () {
    if (this.userId) {
        return Clinic.Collection.Staff.find();
    }
});

/**
 * diseaseCategory
 */

Meteor.publish('clinicDiseaseCategory', function () {
    if (this.userId) {
        return Clinic.Collection.diseaseCategory.find();
    }
});

/**
 * Disease
 */

Meteor.publish('clinicDisease', function () {
    if (this.userId) {
        return Clinic.Collection.Disease.find();
    }
});

/**
 * Patient
 */

Meteor.publish('clinicPatient', function () {
    if (this.userId) {
        return Clinic.Collection.Patient.find();
    }
});

/**
 * Expense Type
 */

Meteor.publish('clinicExpenseType', function () {
    if (this.userId) {
        return Clinic.Collection.expenseType.find();
    }
});

/*
 * Expense
 */

Meteor.publish('clinicExpense', function () {
    return Clinic.Collection.Expense.find();
});

/*
 *Supplier
 */
Meteor.publish('clinicSupplier', function () {
    return Clinic.Collection.Supplier.find();
});

/*
 * Order Category
 */
Meteor.publish('clinicOrderCategory', function () {
    return Clinic.Collection.orderCategory.find();
});

/*
 *Order Item
 */

Meteor.publish('clinicOrderItem', function () {
    return Clinic.Collection.orderItem.find();
});
/*
 *Register
 */
Meteor.publish('clinicRegister', function () {
    return Clinic.Collection.Register.find();
});

/*
 * Treatment
 */
Meteor.publish('clinicTreatment', function () {
    return Clinic.Collection.Treatment.find();
});

/*
 *Upload Image Treatment
 */
Meteor.publish('images', function () {
    return Images.find();
});

/*
 * Deposit
 */
Meteor.publish('clinicDeposit', function () {
    return Clinic.Collection.Deposit.find();
});

/*
 * Purchase
 */
Meteor.publish('clinicPurchase', function () {
    return Clinic.Collection.Purchase.find();
});



