
document.addEventListener("DOMContentLoaded", function() {
    // Reference to the sales table body
    var salesTableBody = document.getElementById("salesTableBody");
  
    // Function to update the table with data
    function updateTable(snapshot) {
      // Clear existing table rows
      salesTableBody.innerHTML = "";
  
      // Get current month and year
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1
      var currentYear = currentDate.getFullYear();
  
      // Format the current date in "MMMDD" format
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var formattedDate = monthNames[currentMonth - 1] + currentDate.getDate();
  
      // Variables to store total values
      var totalPrice = 0;
      var totalCost = 0;
      var totalProfit = 0;
  
      // Loop through the retrieved records
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
  
        // Get month and year of the data
        var dataDate = new Date(childData.timestamp);
        var dataMonth = dataDate.getMonth() + 1;
        var dataYear = dataDate.getFullYear();
  
        // Check if the data is from the current month and year
        if (dataMonth === currentMonth && dataYear === currentYear) {
          // Create a new row in the table
          var newRow = salesTableBody.insertRow();
  
          // Create cells for each column
          var dateCell = newRow.insertCell(0);
          var itemCell = newRow.insertCell(1);
          var priceCell = newRow.insertCell(2);
          var costCell = newRow.insertCell(3);
          var profitCell = newRow.insertCell(4);
  
          // Set the cell values
          dateCell.textContent = formattedDate; // Set the date to the formatted current date
          itemCell.textContent = childData.item;
          priceCell.textContent = childData.salePrice;
          costCell.textContent = childData.cost;
          profitCell.textContent = childData.profit;
  
          // Update total values
          totalPrice += parseFloat(childData.salePrice);
          totalCost += parseFloat(childData.cost);
          totalProfit += parseFloat(childData.profit);
        }
      });
  
      // Update total labels
      document.getElementById("t_sales").textContent = totalPrice.toFixed(2); // Format to two decimal places
      document.getElementById("t_cost").textContent = totalCost.toFixed(2);
      document.getElementById("N_profit").textContent = totalProfit.toFixed(2);
//--------------------------------------
var priceHeader = document.querySelector("#salesTable th:nth-child(3)");
var costHeader = document.querySelector("#salesTable th:nth-child(4)");
var profittHeader = document.querySelector("#salesTable th:nth-child(5)");
priceHeader.textContent = "Price: " + totalPrice;
costHeader.textContent= "Cost: " + totalCost;
profittHeader.textContent="profit: " + totalProfit;
//---------------------------------------

    }
  
    // Reference to the "sales" node in Firebase
    var salesRef = firebase.database().ref('sales');
  
    // Listen for changes in the "sales" node
    salesRef.on('value', function(snapshot) {
      updateTable(snapshot);
    }, function(error) {
      console.error("Error updating table: ", error);
    });
  });
  

  