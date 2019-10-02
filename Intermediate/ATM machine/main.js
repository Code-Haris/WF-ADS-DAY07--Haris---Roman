function withdrawlMoney(amount){
	var noteArr = [1, 2, 5, 10, 20, 100, 500];

    if (isNaN(amount)) {
        alert("Enter the number")
    }
    else {
        for (var i = noteArr.length; i>=0; i--) {
            if (amount>= noteArr[i]) {
                if (amount % noteArr[i] !== 0 || amount % noteArr[i] == 0){
                    var note = Math.floor(amount /noteArr[i]);
                    amount = amount-noteArr[i]*note;
                    
                    alert(note + " of " + noteArr[i]);
                }
            }
        }
    }
	
}

function enterAmount(){
	var amount = document.getElementById("amount").value;
	withdrawlMoney(amount);
}
