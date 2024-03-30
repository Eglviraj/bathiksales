document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn_save").addEventListener("click", function() {
//---------------------------------

var itemSelect = document.getElementById("item");
  var salePrice = document.getElementById("sale_price").value;
  var cost = document.getElementById("cost").value;

  // Check if all fields are not empty
  if (itemSelect.value === "" || salePrice === "" || cost === "") {
    alert("Please select an item and enter both sale price and cost!");
    return; // Prevent default behavior (e.g., form submission)
  }

  // Your existing code to run when all fields are valid (replace with your logic)
  console.log("Saving data...");

//--------------------------------
        // Retrieve values from input fields
        var itemSelect = document.getElementById("item");
        var itemIndex = itemSelect.selectedIndex;
        var item = itemSelect.options[itemIndex].text; // Get the text of the selected option

        var salePrice = document.getElementById("sale_price").value;
        var cost = document.getElementById("cost").value;
        var profit = document.getElementById("profit").value;

        // Get current timestamp
        var timestamp = new Date().getTime();

        // Push data to Firebase Realtime Database under "sales" node
        firebase.database().ref('sales').push({
            item: item,
            salePrice: salePrice,
            cost: cost,
            profit: profit,
            timestamp: timestamp
        })
        .then(function() {
            console.log("Data saved successfully!");
            // Clear input fields after saving data
            document.getElementById("item").value = "";
            document.getElementById("sale_price").value = "";
            document.getElementById("cost").value = "";
            document.getElementById("profit").value = "";
        })
        .catch(function(error) {
            console.error("Error saving data: ", error);
        });
    });
});