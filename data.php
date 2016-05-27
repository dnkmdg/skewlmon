<?php
  require_once 'core/class.skewlmon.php';
  
  if(isset($_GET['action']) && $_GET['action'] == 'get_data'):
    $skewlmon = new skewlmon($_GET['host']);
    echo $skewlmon->get_data();
  endif;
  
?>
