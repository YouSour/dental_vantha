/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Treatment = new Mongo.Collection('dental_treatment');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Treatment = new SimpleSchema({
  patientId: {
    type: String
  },
  registerId: {
    type: String
  },
  treatmentDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    },
    label: "Treatment Date"
  },
  doctorId: {
    type: String,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.doctorForOther();
      }
    }
  },
  des: {
    type: String,
    label: "Description",
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor',
        settings: {
          height: 92,
          toolbar: [
            //[groupname, [button list]]
            ['style', ['bold', 'italic', 'underline']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['insert', ['picture']],
            ['misc', ['fullscreen']],
          ]
        }
      }
    }
  },
  attachFile: {
    type: [String],
    label: 'Choose file',
    optional: true
  },
  "attachFile.$": {
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Files'
      }
    }
  },
  // attachFile: {
  //   type: String,
  //   label: 'Choose file',
  //   autoform: {
  //     afFieldInput: {
  //       type: 'fileUpload',
  //       collection: 'Files'
  //     }
  //   },
  //   optional: true
  // },
  branchId: {
    type: String
  }
});

/**
 * Attache schema
 */
Dental.Collection.Treatment.attachSchema(Dental.Schema.Treatment);
