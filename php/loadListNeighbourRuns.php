<?php

$startDir = urldecode($_POST['dir']);
$startRunNumber = urldecode($_POST['startRunNumber']);
$endRunNumber = urldecode($_POST['endRunNumber']);
clearstatcache();

$listOfRuns = array();

for($i=$startRunNumber; $i<=$endRunNumber; $i++) {
	$currentNumber = (string)$i;
	$newDir = str_replace($startRunNumber, $currentNumber, $startDir);

	if( file_exists("/data/users" . $newDir) ) {
		array_push($listOfRuns, $newDir);
	}
}

echo json_encode($listOfRuns);
return;
?>
