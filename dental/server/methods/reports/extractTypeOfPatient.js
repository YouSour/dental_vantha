Meteor.methods({
  extractTypeOfPatient: function(typeOfPatient, male, female) {
    var arr = typeOfPatient.split(',');
    concatePatient = '<td><table class="table">';
    concateMale = '<td><table class="table">';
    concateFemale = '<td><table class="table">';
    for (var i = 0; i < arr.length; i++) {
      concatePatient += '<tr><td>' + arr[i] + '</td><tr>';
      concateMale += '<tr><td>' + male[arr[i]] + '</td><tr>';
      concateFemale += '<tr><td>' + female[arr[i]] + '</td><tr>';
    }
    concatePatient += '</table></td>';
    concateMale += '</table></td>';
    concateFemale += '</table></td>';

    return concatePatient + concateMale + concateFemale;
  }
});
