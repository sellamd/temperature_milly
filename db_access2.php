<?php

	$serveur = "localhost";
	$base = "temperatures_milly";
	$user = "root";
	$pass = "Concorde001";
	
	
	
	$now = date("Y-m-d H:i:s");
	
	if (!defined("THERMOMETER_SENSOR_1_PATH")) 
	{
		define("THERMOMETER_SENSOR_1_PATH", "/sys/devices/w1_bus_master1/28-01191ef4e5fc/w1_slave");
	}
	if (!defined("THERMOMETER_SENSOR_2_PATH")) 
	{
		define("THERMOMETER_SENSOR_2_PATH", "/sys/devices/w1_bus_master1/10-0008023bf532/w1_slave");
	}


	// Open resource file for thermometer
	$thermometer = fopen(THERMOMETER_SENSOR_1_PATH, "r"); 

	// Get the contents of the resource
	$thermometerReadings = fread($thermometer, filesize(THERMOMETER_SENSOR_1_PATH)); 

	// Close resource file for thermometer
	fclose($thermometer); 

	// We're only interested in the 2nd line, and the value after the t= on the 2nd line
	preg_match("/t=(.+)/", preg_split("/\n/", $thermometerReadings)[1], $matches);
	$temperature1 = $matches[1] / 1000; 

	// Open resource file for thermometer
	$thermometer = fopen(THERMOMETER_SENSOR_2_PATH, "r"); 

	// Get the contents of the resource
	$thermometerReadings = fread($thermometer, filesize(THERMOMETER_SENSOR_2_PATH)); 

	// Close resource file for thermometer
	fclose($thermometer);
	// We're only interested in the 2nd line, and the value after the t= on the 2nd line
	preg_match("/t=(.+)/", preg_split("/\n/", $thermometerReadings)[1], $matches);
	$temperature2 = $matches[1] / 1000; 

	
	// Output the temperature
	//echo $temperature . " °C. \n\r";
	
	/*
	$mysqli est une nouvelle instance de la classe mysqli
	prédéfinie dans php et hérite donc de ses propriétés et méthodes
	connexion à la base de données
	*/
	$mysqli = new mysqli($serveur, $user, $pass, $base);
	// si la connexion se fait en UTF-8, sinon ne rien indiquer
	// $mysqli->set_charset("utf8");
	/*
	utilisation de la méthode connect_error
	qui renvoie un message d'erreur si la connexion échoue
	*/
	if ($mysqli->connect_error) {
		die('Erreur de connexion ('.$mysqli->connect_errno.')'. $mysqli->connect_error);
	}
	/*else {
		echo 'connexion réussie : '.$mysqli->host_info;
	}*/
	
	//$requete ="INSERT INTO TEMPERATURES VALUES ('2020-02-02 00:00:00',".$temperature1.$temperature2.",0)";
	
	$requete ="INSERT INTO TEMPERATURES VALUES ('".$now."',".$temperature1.",".$temperature2.",0)";
	// envoi de la requête
	$resultat = $mysqli->query($requete) or die ('Erreur '.$requete.' '.$mysqli->error);	

?> 
