/**
 * Staff
 */

Meteor.publish('dental_staff', function () {
    if (this.userId) {
        return Dental.Collection.Staff.find();
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

/**
 * Expense Type
 */

Meteor.publish('dental_expenseType', function () {
    if (this.userId) {
        return Dental.Collection.expenseType.find();
    }
});

/*
 * Expense
 */

Meteor.publish('dental_expense', function () {
    return Dental.Collection.Expense.find();
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
    return Dental.Collection.orderCategory.find();
});

/*
 *Order Item
 */

Meteor.publish('dental_orderItem', function () {
    return Dental.Collection.orderItem.find();
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
 * Purchase
 */
Meteor.publish('dental_purchase', function () {
    return Dental.Collection.Purchase.find();
});