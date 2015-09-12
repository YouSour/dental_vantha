/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.MaterialCostCategory = new Mongo.Collection('dental_materialCostCategory');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.MaterialCostCategory = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    des: {
        type: String,
        max: 500,
        optional: true
    }
});

/**
 * attachSchema
 */
Dental.Collection.MaterialCostCategory.attachSchema(Dental.Schema.MaterialCostCategory);