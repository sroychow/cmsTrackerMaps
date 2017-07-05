<?php

$startDir = urldecode($_POST['dir']);
$startRunNumber = urldecode($_POST['startRunNumber']);
$endRunNumber = urldecode($_POST['endRunNumber']);
$resourceName = urldecode($_POST['resource']);

clearstatcache();

$listOfRuns = array();
$startGrpDir = intval($startRunNumber / 1000);

for($i=$startRunNumber; $i<=$endRunNumber; $i++) {
	$currentNumber = (string)$i;

	$grpDir = intval($i / 1000); // directory with the first 3 digits of the run
	$newDir = str_replace($startRunNumber, $currentNumber, $startDir);
	$newDir = str_replace($startGrpDir, $grpDir, $newDir);

	if( file_exists("/data/users" . $newDir . $resourceName) ) {
		array_push($listOfRuns, $newDir . $resourceName);
	}
}

echo json_encode($listOfRuns);
?>
