$(document).ready(function(){
  app.init();  
});

var app = {
  chart : null,
  init : function(){
    Chart.defaults.global.animation.duration = 0;
    Chart.defaults.global.legend.labels.fontColor =  '#ffffff';
    Chart.defaults.global.legend.labels.fontFamily =  'Monaco';
    
    $.each(app.charts, function(i,n){
      if(document.getElementById(i)){
        var chart = document.getElementById(i).getContext("2d");
        app.charts[i]['chart'] = new Chart(chart,n);
      }
    });
    
    app.poll();
  },
  poll : function(){
    setTimeout(function() {
      $.ajax({ url: "data.php", data :{'action':'get_data'}, dataType: "json"})
      .done(app.update)
      .always(app.poll);
    }, 1000);
  },
  update : function(data){
    $.each(app.charts, function(i,n){
      if(typeof app.charts[i].update == 'function'){
        app.charts[i].update(data);
      }
      if(app.charts[i]['chart'] && typeof app.charts[i]['chart'].update == 'function'){
        app.charts[i]['chart'].update(); 
      }
    });
  },
  charts : {
    connections : {
      type : 'line',
      data : {
        labels : [],
        datasets : [
          {
            label : 'Active',
            lineTension: 0,
            borderColor : "#a6e22e",
            data : [0]
          },
          {
            label : 'Sleeping',
            lineTension: 0,
            borderColor : "#f92672",
            data : [0]
          }
          
        ]
      },
      options : {
        elements : {
          point : {
            radius : 0
          }
        },
        //scaleStartValue: 0,
        scales : {
          yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,
                  steps:100,
                  stepValue:1
              }
          }]
        }
      },
      update : function(d){
        if(this.data.labels.length >= 500){
          this.data.labels.shift();
          this.data.datasets[0].data.shift();
          this.data.datasets[1].data.shift();
        }
        
        this.data.labels.push('');
        this.data.datasets[0].data.push(d.connections.query);
        this.data.datasets[1].data.push(d.connections.sleep);
        
        $('.process-list table tbody').html('');
        $('.num_connections').html(d.connections.query + d.connections.sleep);
        $(d.processes).each(function(index, item) {     
          var html = '<tr style="color:'+(item.Command != 'Sleep' ? '#a6e22e' : '#f92672')+'">';
              html += '<td>'+item.Id+'</td>';
              html += '<td>'+item.User+'</td>';
              html += '<td>'+item.Host+'</td>';
              html += '<td>'+(item.db == null ? '' : item.db)+'</td>';
              html += '<td>'+item.Command+'</td>';
              html += '<td>'+item.Time+'</td>';
              html += '<td>'+item.State+'</td>';
              html += '<td>'+item.Info+'</td>';          
              html += '</tr>';
              $('.process-list tbody').append(html);
        });
      }

    },
    status : {
      update : function(d){
        data = $.extend(d.status,d.variables);
        
        $.each(data,function(i,n){
          if(i.substr(0,5) == 'Uptim')
            n = n.toHHMMSS();
          if(i.substr(0,5) == 'Bytes')           
            n = n.toSize();             
          
          $('.'+i.toLowerCase()).html(n);
        });
      }
    },
    users : {
      type : 'bar',
      options : {
        scaleStartValue: 0,
      },
      data : {
          labels: [],
          datasets: [
              {
                  label: "Connections/user",
                  backgroundColor: "rgba(230, 219, 116, 0.2)",
                  borderColor: "rgba(230, 219, 116, 1)",
                  borderWidth: 1,
                  hoverBackgroundColor: "rgba(230, 219, 116, 0.4)",
                  hoverBorderColor: "rgba(255,99,132,1)",
                  data: [65, 59, 80, 81, 56, 55, 40],
              }
          ]
      },
      update : function(d){
        var self = this;
        var users = {};
        $.each(d.processes,function(i,n){
          if(users[n.User]){
            users[n.User]++;
          } else {
            users[n.User] = 1;
          }
        });

        self.data.labels = [];
        self.data.datasets[0].data = [];
        
        $.each(users,function(i,n){
          self.data.labels.push(i);
          self.data.datasets[0].data.push(n);
        });
      }
    },
    traffic : {
      type : 'line',
      data : {
        labels : [],
        datasets : [
          {
            label : 'Outgoing kb/s',
            lineTension: 0,
            borderColor : "#28B3DB",
            data : []
          },{
            label : 'Incoming kb/s',
            lineTension: 0,
            borderColor : "#f92672",
            data : []
          }
        ]
      },
      options : {
        elements : {
          point : {
            radius : 0
          }
        },
      },
      last_traffic_out : 0,
      last_traffic_in : 0,
      update : function(d){
        var tx = parseInt(d.status.Bytes_sent);
        var tz = parseInt(d.status.Bytes_received);
        
        if(this.last_traffic_out == 0){
          this.last_traffic_out = tx; 
          return false;
        }
        
        if(this.last_traffic_in == 0){
          this.last_traffic_in = tz; 
          return false;
        } 
        
        if(this.data.labels.length >= 500){
          this.data.labels.shift();
          this.data.datasets[0].data.shift();
          this.data.datasets[1].data.shift();
        }
        
        var ret_out = Math.round((tx - this.last_traffic_out) * 100) / 100;
        var ret_in = Math.round((tz - this.last_traffic_in) * 100) / 100;
        
        this.data.labels.push('');
        this.data.datasets[0].data.push(ret_out/1024);       
        this.data.datasets[1].data.push(ret_in/1024);       
        this.last_traffic_out = tx;
        this.last_traffic_in = tz;
        
        
        $('.traffic').html(ret_out.toString().toSize()+'/s | '+ret_in.toString().toSize()+'/s');
      
      }
    },
    keyefficiency : {
      type : 'doughnut',
      options : null,
      data : {
        labels: [
        ],
        datasets: [
          {
            data: [100,0],
            borderWidth : 0,
            backgroundColor: [
              "#36A2EB"
            ]
          }]
      },
      update : function(d){
        var eff = 100 - (d.status.Key_reads / d.status.Key_read_requests * 100);
        this.data.datasets[0].data = [eff,100-eff];
        $('.key-efficiency').html(Math.round(eff * 100) / 100+'%');
      }
    },
    queries : {
      com_select : 0,
      com_insert : 0,
      com_update : 0,
      com_delete : 0,
      com_create : 0,
      com_alter : 0,
      com_drop : 0,
      update : function(d){
        var data = d.status;
        var self = this;
        
        $.each(data,function(i,n){
          i = i.toLowerCase();
          if(self[i] !== undefined){
            if(self[i] == 0){
              self[i] = n;
            } else {
              $('.'+i).html(n-self[i]);
              self[i] = n; 
            }
          }
        });
      }
    },
    innodb : {
      innodb_data_writes : 0,
      innodb_data_reads : 0,
      innodb_ib_usage : 0,
      update : function(d){
        var data = d.status;
        var self = this;
        
        if(-0.00001 <= data.Innodb_buffer_pool_pages_total <= 0.00001){
          
        } else {
          data['innodb_ib_usage'] = (100 * (data.Innodb_buffer_pool_pages_total - data.Innodb_buffer_pool_pages_free)) / data.Innodb_buffer_pool_pages_total; 
        }
        
        $.each(data,function(i,n){
          i = i.toLowerCase();
          if(self[i] !== undefined){
            if(self[i] == 0){
              self[i] = n;
            } else {
              $('.'+i).html(n-self[i]);
              self[i] = n; 
            }
          }
        });
      }
    }
  },
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

String.prototype.toSize = function () {
  var bytes = this;
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return 'n/a';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + ' ' + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}
