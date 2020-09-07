<?php
$start_time = microtime(true);
$R = $_POST['R'];
$X = $_POST['X'];
$Y = $_POST['Y'];
$RESULT=false;
//$answer = "{\"RESULT_CODE\": 1}";
//header('Content-type: application/json');
$optionsR = array('options' => array(
        'min_range' => 1,
        'max_range' => 5,
    )
);

$optionsY = array('options' => array(
        'min_range' => -2,
        'max_range' => 2,
    )
);

$optionsX = array('options' => array(
        'min_range' => -3,
        'max_range' => 5,
    )
);

if (filter_var($X, FILTER_VALIDATE_FLOAT, $optionsX) !== false and
    filter_var($Y, FILTER_VALIDATE_FLOAT, $optionsY) !== false and
    filter_var($R, FILTER_VALIDATE_FLOAT, $optionsR) !== false){

        if ($X<0 && $Y > 0) {
            $RESULT=false;
        }elseif ($X>=0 && $Y>=0 && ($X**2 + $Y**2 <= $R**2)) {
            $RESULT=true;
        }elseif ($X>=0 && $Y<=0 && ($Y >= $X - $R)){
            $RESULT=true;
        }elseif (($X<=0 && $Y<=0) && ($X >= -$R/2) && ($Y <= $R)){
            $RESULT=true;
        }else{
            $RESULT=false;
        }

        $DATE_TIME = date("Y-m-d H:i:s");
        $WORKING_TIME =  microtime(true) - $start_time;

        $answer = "{\"X\":";
        $answer .= $X;
        $answer .= ",\"Y\":";
        $answer .= $Y;
        $answer .= ",\"R\":";
        $answer .= $R;
        $answer .= ",\"RESULT\":";
        $answer .= $RESULT ? 'true' : 'false';
        //$answer .= ",\"RESULT_CODE\": 0";
        $answer .= ",\"WORKING_TIME\": \"$WORKING_TIME\", \"DATE_TIME\": \"$DATE_TIME\"}";
        

        
        if (isset($_COOKIE["data"])){   
            $answer=($_COOKIE["data"] . "," . $answer);
        }  

        header('Set-Cookie: data='.$answer."; samesite=lax");
        echo true;
        
}else echo false;
//echo $answer;
?>