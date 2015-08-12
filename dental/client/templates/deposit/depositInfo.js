Template.dental_depositInfo.helpers({
    data: function () {
        var self = this;

        var getData = Dental.Collection.Deposit.find({registerId: self.registerId});

        return getData;
    },
    totalDeposit:function(){
        var self = this;
        var total = 0;
        var getData = Dental.Collection.Deposit.find({registerId: self.registerId}).forEach(function(obj){
            total += obj.amount;
        });
        return total;
    }
});