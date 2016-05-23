<?php
  require_once 'core/class.db.php';
  
  class skewlmon{    
    function __construct(){
    }
    
    public function get_processlist(){
      $processes = db::select('show processlist');
      $connections = array(
        'sleep' => 0,
        'query' => 0
      );
      
      foreach($processes as $process):
        if($process['Command'] == 'Sleep'):
          $connections['sleep']++;
        else:
          $connections['query']++;
        endif;
      endforeach;
      
      return array($connections,$processes);
    }
    
    public function get_status(){
      $status = db::select('show global status;','keypair');
      $status['full_table_scans'] = round(($status['Handler_read_rnd_next'] + $status['Handler_read_rnd']) / ($status['Handler_read_rnd_next'] + $status['Handler_read_rnd'] + $status['Handler_read_first'] + $status['Handler_read_next'] + $status['Handler_read_key'] + $status['Handler_read_prev']),2);
      
      return $status;
    }
    
    public function get_variables(){
      $variables = db::select('show variables;','keypair');
      
      return array('version' => $variables['version'].' @ '.$variables['hostname']);
    }
    
    public function get_data(){
      $result = array('timestamp' => date('H:i:s'));
      
      list($result['connections'],$result['processes']) = $this->get_processlist();
      
      $result['status'] = $this->get_status();
      $result['variables'] = $this->get_variables();
      
      return json_encode($result);
    }
  }
  
?>
