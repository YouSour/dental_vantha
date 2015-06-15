/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.diseaseCategory = new Mongo.Collection("clinic_diseaseCategory");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.diseaseCategory = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 250
    },
    createdDate: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        },
        denyUpdate: true
    },
    updatedDate: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    }
});

/**
 * Attach schema
 */
Clinic.Collection.diseaseCategory.attachSchema(Clinic.Schema.diseaseCategory);
