<?php
class Helper
{
    public function __construct() {
        die('Init function is not allowed');
    }
     
    public static function get_params($params, $arr_column){
       $res = array(); 
       foreach ($arr_column as $column) {
           $val = self::convert_type(self::default_nul_val($params[$column], null));
           array_push($res,$val);
       }
       return $res;
   }
   
   public static function get_limit($params){
       $res = array(); 
       $page = self::convert_type(self::default_nul_val($params['page'],1));
       $count = self::convert_type(self::default_nul_val($params['count'],5));
       $offset = ($page - 1) * $count;
       $res['offset'] = $offset;
       $res['count'] = $count;
       return $res;
   }
   
   public static function convert_type($val) { 
        if (is_numeric($val)) { 
            return $val + 0; 
        } 
        return $val; 
    }
    
    public static function default_nul_val($val, $default){
        return !$val ? $default : $val;
    }
}
?>
