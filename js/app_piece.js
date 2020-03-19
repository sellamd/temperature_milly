

var LatestDateTime;
var EarliestDate;
var colors = ['#FFA07A', '#9cdcbd','#e3e713'];
// Data
var DateTime = [];
//Room's labels or names
var room = [];
// Number of room where temperature are monitored      
var NbRoom;
var memoire = 0;
var ctx2 = $("#convaspiece");
//Max reords to be shown at same time
const NB_RECORDS = 10;
const FIRST_RECORD = 0;
// Create a new linegraph

var chartdata = 
{
		// Fill X axel
	labels: DateTime,
        
};// Chartdata
var lineGraph3 = new Chart(ctx2, 
{
       type: 'line',
       data: chartdata
});



$(document).ready(function()
{
  $.ajax
  ({
    url: "http://localhost/db_access4.php",
    method: "GET",
    success: function(data) 
    {
		
		console.log(data);
      
		if ((data.length>0)&&((data.length>=NB_RECORDS)))
		{
			// Create a matrix which will store records
			RoomsRecords = new Array(1024);
			j = 0;
			// We'll take only the 10 latest values
			// Récupération des données et insertion dans le tableau
			for (i = (data.length-NB_RECORDS); i < data.length; i++) 
			{
				DateTime.push(data[i].DATE_HEURE);
				console.log(DateTime[j]);     
				RoomsRecords [j] = data[i].PIECE_1;
				console.log(RoomsRecords[j]);
				console.log(i);
				j++;
			}
        
        
			//EarliestDate = data[FIRST_RECORD].DATE_HEURE;
			EarliestDate = DateTime[FIRST_RECORD];
		
			//LatestDateTime = data[NB_RECORDS-1].DATE_HEURE;
			LatestDateTime = DateTime[NB_RECORDS-1];
			console.log ("Date la plus récente");
			console.log (LatestDateTime);
		 
			var DynDataSet = 
			{
				label: 'PIECE_1',
				data: RoomsRecords,
				backgroundColor: colors[0],
				borderColor:colors[0],
				hoverBackgroundColor:colors[0],
				hoverBorderColor:colors[0],
				fill: false
			}
			
			lineGraph3.data.datasets.push(DynDataSet);
			lineGraph3.update();
		}// if
        else
        {
			console.log ("warning data length = "+data.length);
		}
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
		url: "http://localhost/db_access4.php",
		method: "POST",
		data:"dir=<&"+"date="+EarliestDate+"&Nb=1",
		datatype:"html",
    
		
		success: function(data) 
		{
			// Earliest date
			console.log ("Earliest date : "+EarliestDate);
			
			if ((data.length>0)&&(lineGraph3.data.datasets.length > 0)) 
			{
				//console.log (data);
				//DateTime.push(data[0].DATE_HEURE);
				console.log  (data[FIRST_RECORD].DATE_HEURE);     
			
				// Add records at begining
				RoomsRecords.unshift (data[FIRST_RECORD].PIECE_1);
			
				//console.log(RoomsRecords[0]);
				// console.log (memoire);
				//memoire++;
				
				// Add new label at begining
				lineGraph3.data.labels.unshift(data[FIRST_RECORD].DATE_HEURE);
				
				// Remove first Label
				lineGraph3.data.labels.splice(NB_RECORDS, 1);
				
				lineGraph3.data.datasets[FIRST_RECORD].data = RoomsRecords;
				lineGraph3.data.datasets[FIRST_RECORD].data.pop(FIRST_RECORD);
				
				// Memorise latestdate
				EarliestDate = data[FIRST_RECORD].DATE_HEURE;
				
				// Memorise latestdate
				LatestDateTime = lineGraph3.data.labels[NB_RECORDS-1];
				console.log ("Latest date : "+LatestDateTime);		
			}
			else
			{
				console.log ("warning data length = "+data.length);
				console.log ("... or warning datasets length = "+lineGraph3.data.datasets.length);
			
			}
			lineGraph3.update();
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
		url: "http://localhost/db_access4.php",
		method: "POST",
		data:"dir=>&"+"date="+LatestDateTime+"&Nb=1",
		datatype:"html",
    
		success: function(data) 
		{
			
			if ((data.length>0)&&(lineGraph3.data.datasets.length > 0)) 
			{
				// console.log ("Bizarre !!!!!!");
				//DateTime.push(data[0].DATE_HEURE);
				
				console.log  (data[FIRST_RECORD].DATE_HEURE);     
			
				RoomsRecords[NB_RECORDS] = data[FIRST_RECORD].PIECE_1;
			
				// Log latest sample
				console.log(RoomsRecords[NB_RECORDS]);
				// console.log (memoire);
				//memoire++;
				
				// Add new label
				lineGraph3.data.labels.push(data[FIRST_RECORD].DATE_HEURE);
				
				// Remove first Label
				lineGraph3.data.labels.splice(FIRST_RECORD, 1);
				
				// Shift data left
				RoomsRecords.shift ();
				
				
				lineGraph3.data.datasets[FIRST_RECORD].data = RoomsRecords;
				// Remove fisrt data 
				lineGraph3.data.datasets[FIRST_RECORD].data.pop(FIRST_RECORD);
				
				// Memorise earliest date
				EarliestDate = lineGraph3.data.labels[0];
				console.log ("Earliest date : "+EarliestDate);
				
				// Memorise latestdate
				LatestDateTime = data[FIRST_RECORD].DATE_HEURE;
				console.log ("Latest date : "+LatestDateTime);
				
					
			}
			else
			{
				console.log ("warning data length = "+data.length);
				console.log ("... or warning datasets length = "+lineGraph3.data.datasets.length);
			}
			lineGraph3.update();
		},
		error: function(data) 
		{
			console.log(data);
		}// Error
	});
}


