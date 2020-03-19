

var LatestDateTime;
var EarliestDate;
var colors = ['#FFA07A', '#9cdcbd','#e3e713'];
// Data
var DateTime = [];
//Room's labels or names
var room = [];
// Number of room where temperature are monitored      
var NbRoom;
var ctx = $("#mycanvas");
// Create a new linegraph

var chartdata = 
{
		// Fill X axel
	labels: DateTime,
        
};// Chartdata
var lineGraph2 = new Chart(ctx, 
{
       type: 'line',
       data: chartdata
});

$(document).ready(function()
{
  $.ajax
  ({
    url: "http://localhost/db_access3.php",
    method: "GET",
    success: function(data) 
    {
		
      console.log(data);
      // // Retreive rooms' number
	  NbRoom = data[0];
	  
	  // console.log(NbRoom);
	  // Retreive rooms' name
	  for (var j = 1;j<NbRoom+1;j++)
	  {
		 room.push (data[j].PIECE);
	  }
	  
	  // Create a matrix which will store records
	  var RoomsRecords = new Array(NbRoom);
	  for (var i = 0; i < NbRoom; i++)
	  {
			RoomsRecords[i] = new Array(24);
	  }
	  
	  // We assume there is only 24 records (logs)
      for(var i=0;i< 24;i++) 
      {
		// Récupération des données et insertion dans le tableau
		DateTime.push(data[i+NbRoom+1].DATE_HEURE);
        RoomsRecords[0][i]= data[i+NbRoom+1].PIECE_1;
        RoomsRecords[1][i]= data[i+NbRoom+1].PIECE_2;
        RoomsRecords[2][i]= data[i+NbRoom+1].PIECE_3;
        
        if( i == 0)
        {
			EarliestDate = data[i+NbRoom+1].DATE_HEURE;
		}
        // Save the latest datetime
        LatestDateTime = data[i+NbRoom+1].DATE_HEURE;
      }// For 
           
      // Fill dat dynamically from db_access.php
      for (i = 0; i < NbRoom; i++) 
      {
		var DynDataSet = 
		{
			label: room[i],
			data: RoomsRecords[i],
			backgroundColor: colors[i],
			borderColor:colors[i],
			hoverBackgroundColor:colors[i],
			hoverBorderColor:colors[i],
			fill: false
		}
			
		lineGraph2.config.data.datasets.push(DynDataSet);
	 }
	 lineGraph2.update();
            
    },// Sucsess
    error: function(data) 
    {
      console.log(data);
    }// Error
    
  });// Ajax
  
 
}// Function


);

/*
 * Load Previous Temperature records
 */
function PrevTemp ()
{
 // alert ("Ca marche !!!!!");
  $.ajax
  ({
    url: "http://localhost/db_access3.php",
    method: "POST",
    data:"dir=<&"+"date="+LatestDateTime,
    datatype:"html",
    
    success: function(data) 
    {
		console.log(data);
	},
	error: function(data) 
    {
      console.log(data);
    }// Error
	});
}

/*
 * Load next Temperature records
*/

function NextTemp ()
{
 // alert ("Ca marche !!!!!");
  $.ajax
  ({
    url: "http://localhost/db_access3.php",
    method: "POST",
    data:"dir=>&"+"date="+LatestDateTime,
    datatype:"html",
    
    success: function(data) 
    {
		console.log(data);
		
		// // Retreive rooms' number
		//NbRoom = data[0];
	  
		// console.log(NbRoom);
		// Retreive rooms' name
		/*for (var j = 1;j<NbRoom+1;j++)
		{
			room.push (data[j].PIECE);
		}*/
	  
		// Create a matrix which will store records
		var RoomsRecords = new Array(NbRoom);
		for (var i = 0; i < NbRoom; i++)
		{
			RoomsRecords[i] = new Array(24);
		}
	  
		// We assume there is only 24 records (logs)
		for(var i=0;i< 24;i++) 
		{
			// Récupération des données et insertion dans le tableau
			DateTime.push(data[i+NbRoom+1].DATE_HEURE);
			RoomsRecords[0][i]= data[i+NbRoom+1].PIECE_1;
			RoomsRecords[1][i]= data[i+NbRoom+1].PIECE_2;
			RoomsRecords[2][i]= data[i+NbRoom+1].PIECE_3;
        
			if( i == 0)
			{
				EarliestDate = data[i+NbRoom+1].DATE_HEURE;
			}
			// Save the latest datetime
			LatestDateTime = data[i+NbRoom+1].DATE_HEURE;
		}// For 
           
		// Fill dat dynamically from db_access.php
		for (i = 0; i < NbRoom; i++) 
		{
			/*var DynDataSet = 
			{
				label: room[i],
				data: RoomsRecords[i],
				backgroundColor: colors[i],
				borderColor:colors[i],
				hoverBackgroundColor:colors[i],
				hoverBorderColor:colors[i],
				fill: false
			}
			lineGraph2.config.data.datasets.push(DynDataSet);*/
			
			lineGraph2.data.datasets.data[i] = RoomsRecords[i];
			
		}
		lineGraph2.update();
	},
	error: function(data) 
    {
      console.log(data);
    }// Error
	});
}
