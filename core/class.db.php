<?php

require_once 'config.php';
  
class db{
      public static function make($host_key){
        global $connections;
        
        $host = $connections[$host_key]['host'];
        $user = $connections[$host_key]['user'];
        $pass = $connections[$host_key]['pass'];
        
        $options = array(
          PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_PERSISTENT => true
        );
        try{
          $db = new PDO("mysql:host=".$host.";",$user,$pass,$options);
          return $db;
        } catch(PDOException $ex) {
          echo $ex->getMessage()."{DBHOST}";
          die();
        }

      }
  
      public static function select($query, $db, $type="assoc", $binds = null){
        try{
          $pdo = self::make($db);

          $ret = '';
          $query = $pdo->prepare($query);
  
          if(isset($binds)):
            foreach($binds as $key => $val):
              $key = utf8_encode($key);
              if(is_array($val)):
                $query->bindValue($key, $val[0], $val[1]);
              elseif($val == null):
                $query->bindValue($key, $val, PDO::PARAM_NULL);
              else:
                $query->bindValue($key, $val);
              endif;
            endforeach;
          endif;
  
          $query->execute();
          
          switch($type):
            case 'all':
              $ret = $query->fetchAll();
              break;
            case 'col':
              $ret = $query->fetchColumn();
              break;
            case 'row':
              $ret = $query->fetch();
              break;
            case 'first':
              $ret = $query->fetchAll(PDO::FETCH_COLUMN,0);
              break;
            case 'assoc':
              $ret = $query->fetchAll(PDO::FETCH_ASSOC);
              break;
            case 'keypair':
              $ret = $query->fetchAll(PDO::FETCH_KEY_PAIR);
              break;
          endswitch;
  
          unset($query);
  
          return $ret;
        } catch(PDOException $ex){
          echo $ex->getMessage();
          die();
        }
      }
      
      public static function run($query, $binds = null,$return = 'result'){
        $pdo = self::make();
  
        $query = $pdo->prepare($query);
  
        if(isset($binds) && $binds !== null):
          foreach($binds as $key => $val):
             if($val == 'null'):
               $query->bindValue($key, null, PDO::PARAM_INT);
             else:
               $query->bindValue($key, $val);
             endif;
          endforeach;
        endif;
  
        try {
          $pdo->beginTransaction();
          $ret = $query->execute();
          if($return == 'rowsaffected'):
            $ret = $query->rowCount();
          elseif($return == 'lastinsert'):
            $ret = $pdo->lastInsertId(null);
          endif;
          $pdo->commit();
        } catch(PDOExecption $e) {
          $pdo->rollback();
          $ret = "Error!: " . $e->getMessage();
        }
  
        unset($query);
  
        return $ret;
      }
    }
