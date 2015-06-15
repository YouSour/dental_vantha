/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.Disease = new Mongo.Collection("clinic_disease");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.Disease = new SimpleSchema({
    code: {
        type: String,
        label: "Code",
        unique: true,
        max: 250
    },
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 250
    },
    price: {
        type: Number,
        decimal: true
    },
    memberPrice: {
        type: Number,
        decimal: true
    },
    diseaseCategoryId: {
        type: String,
        max: 5,
        autoform: {
            type: "select2",
            options: function () {
                return Clinic.List.diseaseCategory();
            }
        }
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
Clinic.Collection.Disease.attachSchema(Clinic.Schema.Disease);
