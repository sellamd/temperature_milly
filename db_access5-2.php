<?php
// This PHP source allows you to send mail report afert quering mysql db
// Mail is formated in HTML to give it a better look 
// Simple text mail can be sent : you only have to use the correct header
	
	
	$to      = 'receipientname@receiptserver.receiptdoamin';
    $subject = 'Rapport';
    $message = '<!DOCTYPE html PUBLIC "-//WC//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml/DTD/1-strict.dtd">
<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
	<meta http-equiv="content-type" content="text/html; chartset=utf-8">
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
	<table bgcolor="#FFFFFF" border="3" cellpadding="0" cellspacing="10" style="font-family: sans-serif">
	<tbody>
	<caption style="background-color:#65E566;"> Température à Milly</caption>
	
	<tr>
		<th height="10" style="font-size:20px; font-family: sans-serif; line-height:30px" >Températures</th>
		<th height="10" style="font-size:20px; line-height:30px" bgcolor="#91F5E9">min</th>
		<th height="10" style="font-size:20px; line-height:30px" bgcolor="#ED8175">MAX</th>
		<th height="10" style="font-size:20px; line-height:30px">Moyenne</th>
	</tr>
	
	<tr>
		<td height="10" style="font-size:20px; line-height:30px" >Intérieure</td>
		<td height="10" align="center" style="font-size:20px; line-height:30px" bgcolor="#91F5E9">20°</td>
		<td height="10" align="center" style="font-size:20px; line-height:30px" bgcolor="#ED8175">22°</td>
		<td height="10" align="center" style="font-size:20px; line-height:30px">21°</td>
	</tr>
	<tr>
		<td height="10" style="font-size:20px; line-height:30px">Extérieure</td>
		<td height="10" align="center" style="font-size:20px; line-height:30px" bgcolor="#91F5E9">20°</td>
		<td height="10" align="center" style="font-size:20px; line-height:30px" bgcolor="#ED8175">22°</td>
		<td height="10" align="center" style="font-size:20px; line-height:30px" >21°</td>
	</tr>
	</tbody>
	
	</table>
</body>';
    
     /*$headers = 'From: MonRaspberry <yourmail@yourserver.yourdomain>' . "\r\n" .
    'Reply-To: yourmail@yourserver.yourdomain' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();*/
    
    $headers ="MIME-Version:1.0\r\n";
    $headers.='From: MonRaspberry <yourmail@yourserver.yourdomain>' . "\r\n" .
    'Reply-To: yourmail@yourserver.yourdomain' . "\r\n";
    $headers.='Content-Type:text/html; charset="utf-8"'."\r\n";
    $headers.='Content-Transfer-Encoding: 8bit';
    
 
    mail($to, $subject, $message, $headers);
    
    
	//echo $message;
	
?> 
