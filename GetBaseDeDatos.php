<?php

	require_once("con_db.php");
	
	$sql = "select * from objetos where Codigo = :Codigo ";
	$handle = $pdo->prepare($sql);
	$params = ['Email'=>$Email];
	$handle->execute($params);
	if($handle->rowCount() > 0)
	{
		$getRow = $handle->fetch(PDO::FETCH_ASSOC);
		if(password_verify($PasswordLogin, $getRow['Password']))
		{
			unset($getRow['Password']);
			$_SESSION = $getRow;
			header('location:Compra.php');
			exit();
		}
?>