<?php
header('Access-Control-Allow-Origin: *');
//var_dump($_POST);
//exit;

try {
    $conn = new PDO("mysql:host=a07yd3a6okcidwap.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;dbname=p3slyityqr9arsx2", "gupazml2ebchali0", "ng7ehrbl1adzi9q0");
}
catch(PDOException $e)
{
    echo "Error: " .$e->getMessage();
}
$x =$_POST['x'];
$y =$_POST['y'];

$east = $x + 5000;
$west = $x - 5000;
$north = $y + 5000;
$south = $y - 5000;

//$query = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

$query = "SELECT x, y FROM crime WHERE (x < $east AND x > $west) AND (y < $north AND y > $south)";
$result = $conn->query($query);
if($result){
  $crimes = $result->fetchAll(PDO::FETCH_CLASS);

  echo json_encode($crimes);
} else {
  echo json_encode (false);
}
?>
