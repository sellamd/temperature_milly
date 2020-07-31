<?php

   // This file send a HHTP request on checkip and anlyses the response
   // It then send a text email to your favoroite receipt
   
	
	$externalContent = file_get_contents('http://checkip.dyndns.com/');
	preg_match('/Current IP Address: \[?([:.0-9a-fA-F]+)\]?/', $externalContent, $m);
	$externalIp = $m[1];
	
	$to      = 'Receipt@server.domain';
    $subject = 'Adresse';
    $message = 'Bonjour'."\r\n".
    "L'adresse de la machine est :".$externalIp;
    
    $headers = 'From: MonRaspberry <youremail@yourserver.yourdomain>' . "\r\n" .
    'Reply-To: youremail@yourserver.yourdomain' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
 
    mail($to, $subject, $message, $headers);
    
    
	//echo $message;
	
?> 
