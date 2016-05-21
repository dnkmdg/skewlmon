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
    <div class="col-xs-12 text-center">
      <h1 class="version hostname"></h1>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-6">
      <div class="row">
        <div class="col-xs">
          <h2>Connections</h2>
          <canvas id="connections" width="4" height="2"></canvas>
        </div>
        <div class="col-xs">
          <h2>Traffic (<span class="traffic"></span>)</h2>
          <canvas id="traffic" width="4" height="2"></canvas>
        </div>
      </div>
      <div class="row">
        <div class="col-xs">
          <h2>Key efficiency (<span class="key-efficiency"></span>)</h2>
          <canvas id="keyefficiency" width="4" height="2"></canvas>
        </div>
        <div class="col-xs">
          <h2>Queries</h2>
          <div class="row">
            <div class="col-xs-6">
              <div class="query-box">
                <strong>SELECT</strong>
                <span class="com_select"></span>/s
              </div>
            </div>
            <div class="col-xs-6">
              <div class="query-box">
                <strong>UPDATE</strong>
                <span class="com_update"></span>/s
              </div>
            </div>
            <div class="col-xs-6">
              <div class="query-box">
                <strong>INSERT</strong>
                <span class="com_insert"></span>/s
              </div>
            </div>
            <div class="col-xs-6">
              <div class="query-box">
                <strong>DELETE</strong>
                <span class="com_delete"></span>/s
              </div>
            </div>
          </div>
          <h2>InnoDB</h2>
          <div class="row">
            <div class="col-xs-6">
              <div class="query-box">
                <strong>DATA READ</strong>
                <span class="innodb_data_reads"></span>/s
              </div>
            </div>
            <div class="col-xs-6">
              <div class="query-box">
                <strong>DATA WRITE</strong>
                <span class="innodb_data_writes"></span>/s
              </div>
            </div>
            <div class="col-xs-6">
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-xs">
      <div class="row">
        <div class="col-xs">
          <dl>
            <dt>Uptime</dt><dd class="uptime"></dd>
            <dt>Data sent</dt><dd class="bytes_sent"></dd>
            <dt>Data received</dt><dd class="bytes_received"></dd>
            <dt>Select full join</dt><dd class="select_full_join"></dd>
            <dt>Slow queries</dt><dd class="slow_queries"></dd>
            <dt>Threads connected</dt><dd class="threads_connected"></dd>
            <dt>Threads running</dt><dd class="threads_running"></dd>
          </dl>
          <dl>
            <dt>Full table scan</dt><dd class="full_table_scans"></dd>
          </dl>
        </div>
        <div class="col-xs">
          <dl>
            <dt>Active connections</dt><dd class="num_connections"></dd>
            <dt>Connections peak</dt><dd class="max_used_connections"></dd>
            <dt>Connection attempts</dt><dd class="connections"></dd>
            <dt>Failed connections</dt><dd class="aborted_connects"></dd>
            <dt>Aborted connections</dt><dd class="aborted_clients"></dd>
            <dt>Denied connections</dt><dd class="access_denied_errors"></dd>
          </dl>
        </div>
      </div>
      <div class="row">
        <div class="col-xs">
          &nbsp;
        </div>
      </div>
      <div class="process-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th style="width: 120px;">User</th>
              <th>Host</th>
              <th>Database</th>
              <th>Command</th>
              <th>Time</th>
              <th style="width: 100px;">State</th>
              <th style="width: 250px;">Info</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
  <script src="assets/js/chart.js"></script>
  <script src="assets/js/main.js?1"></script>
</body>
</html>
