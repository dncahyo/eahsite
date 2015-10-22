<?php
class Helper
{
    public function __construct() {
        die('Init function is not allowed');
    }
     
    public static function get_params($params, $arr_column){
       $res = array(); 
       foreach ($arr_column as $column) {
           $val = self::convert_type($params[$column]);
           array_push($res,$val);
       }
       return $res;
   }
   
   public static function convert_type($val) { 
        // if (is_numeric($val)) { 
        //     return $val + 0; 
        // } 
        return $val; 
    }
}
?>
