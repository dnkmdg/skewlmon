    <div class="tab <?php echo $conn; echo $first ? ' active' : '' ?>" data-rel="<?php echo $conn ?>">
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
              <div id="<?php echo $conn ?>-connections" style="min-width: 420px; height: 300px; margin: 0 auto"></div>
            </div>
            <div class="col-xs">
              <h2>Traffic (<span class="traffic_text"></span>)</h2>
              <div id="<?php echo $conn ?>-traffic" style="min-width: 420px; height: 300px; margin: 0 auto"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs">
              <h2>Queries total</h2>
              <div id="<?php echo $conn ?>-queries" style="min-width: 420px; height: 200px; margin: 0 auto"></div>
            </div>
            <div class="col-xs">
              <h2>Queries live</h2>
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
                <dt>&nbsp;</dt>
                <dt>Key efficiency</dt><dd class="key-efficiency"></dd>
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
    </div>
