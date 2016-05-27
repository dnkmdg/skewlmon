<?php
  require_once('config.php');
?>
<!doctype html>

<html lang="sv">
<head>
  <meta charset="utf-8">

  <title>SkewlMon</title>
  <meta name="description" content="">
  <meta name="author" content="Ikoncept">

  <link rel="stylesheet" href="assets/css/flexboxgrid.min.css?v=1.0">
  <link rel="stylesheet" href="assets/css/style.css?v=1.0">
</head>

<body>
  <div class="row">
    <div class="col-xs-1 sidebar">
      <?php
        global $connections;
        foreach($connections as $conn => $creds):
      ?>
        <a href="#" data-rel="<?php echo $conn ?>"><?php echo $conn ?></a><br>
      <?php
        endforeach;
      ?>
    </div>
    
    <div class="col-xs content">
      <?php
        global $connections;
        $first = true;
        foreach($connections as $conn => $creds):
          require 'templates/tab.php';
          $first = false;
        endforeach;
      ?>
    </div>
  </div>

  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="assets/js/main.js?1"></script>
</body>
</html>
