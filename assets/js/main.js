Highcharts.theme = {
   colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
         ]
      },
      style: {
         fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};
Highcharts.setOptions(Highcharts.theme);

var tabs = {};

$(document).ready(function(){
  $('.tab').each(function(){
    tabs[$(this).data('rel')] = {
      last_in : 0,
      last_out : 0,
      query : {
        com_select : 0,
        com_insert : 0,
        com_update : 0,
        com_delete : 0,
        com_create : 0,
        com_alter : 0,
        com_drop : 0,
      },
      innodb : {
        innodb_data_writes : 0,
        innodb_data_reads : 0,
        innodb_ib_usage : 0,
      }
    };
  });  

  app.init(tabs);
});

var app = {
  init : function(tabs){    
    app.gui.init();
    $.each(tabs,function(i,n){
      charts.init(i);
      app.poll(i);
    });
  },
  poll : function(tab){
    setTimeout(function() {
      $.ajax({ url: "data.php", data :{'action':'get_data','host':tab}, dataType: "json"})
      .done(function(data){
        charts.update(data.host,data);
      })
      .always(function(data){
        app.poll(tab);
      });
    }, 100); 
  },
  gui : {
    init : function(){
      $('.sidebar a').click(function(){
        $('.tab.active').removeClass('active');
        $('.tab.'+$(this).data('rel')).addClass('active');
      })
    }
  }
}

var charts = {
  init: function(tab){
    var connections_options = charts.connections;
    connections_options.chart.renderTo = tab+"-connections";
    tabs[tab]['connections'] = new Highcharts.Chart(connections_options);
    
    var traffic_options = charts.connections;
    traffic_options.chart.renderTo = tab+"-traffic";
    tabs[tab]['traffic'] = new Highcharts.Chart(traffic_options);
    
    var queries_options = charts.queries;
    queries_options.chart.renderTo = tab+"-queries";
    tabs[tab]['queries'] = new Highcharts.Chart(queries_options);
  },
  update : function(tab,d){
    charts.update_processlist(tab,d);
    charts.update_connections(tab,d);
    charts.update_traffic(tab,d);
    charts.update_status(tab,d);
    charts.update_keyefficiency(tab,d);
    charts.update_queries(tab,d);
    charts.update_innodb(tab,d);
  },
  connections : {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      margin: [10, 0, 10, 40],
    },
    title : {
      text: null
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 10
    },
    yAxis: {
      title: {
        text: null
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'Sleeping connections'
    },{
      name: 'Active connections'
    }]
  },
  traffic: {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      margin: [10, 0, 10, 40],
    },
    title : {
      text: null
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 10
    },
    yAxis: {
      title: {
        text: null
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'Sent'
    },{
      name: 'Received'
    }]
  },
  queries : {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: 10,
          style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%']
      }
    },
    series: [{
      type: 'pie',
      innerSize: '50%'
    }]
  },
  update_processlist : function(tab,d){
    $('.'+tab+' .process-list table tbody').html('');
    $('.'+tab+' .num_connections').html(d.connections.query + d.connections.sleep);
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
        $('.'+tab+' .process-list tbody').append(html);
    });
  },
  update_connections : function(tab,d){
    time = (new Date()).getTime();
    tabs[tab].connections.series[1].addPoint([time,d.connections.query]);
    tabs[tab].connections.series[0].addPoint([time,d.connections.sleep]);
    
    if(tabs[tab].connections.series[0].data.length >= 300){
      tabs[tab].connections.series[0].removePoint(0);
      tabs[tab].connections.series[1].removePoint(0);
    }
  },
  update_traffic : function(tab,d){
    var self = tabs[tab];
    var tx = parseInt(d.status.Bytes_sent);
    var tz = parseInt(d.status.Bytes_received);
    
    if(self.last_out == 0 || self.last_in == 0){
      self.last_out = tx; 
      self.last_in = tz; 
      return false;
    }    
    var ret_out = Math.round((tx - self.last_out) * 100) / 100;
    var ret_in = Math.round((tz - self.last_in) * 100) / 100;

    time = (new Date()).getTime();
    tabs[tab].traffic.series[0].addPoint([time,ret_out/1024]);
    tabs[tab].traffic.series[1].addPoint([time,ret_in/1024]);
    
    if(tabs[tab].traffic.series[0].data.length >= 300){
      tabs[tab].traffic.series[0].removePoint(0);
      tabs[tab].traffic.series[1].removePoint(0);
    }
    
    self.last_out = tx;
    self.last_in = tz;
    
    $('.'+tab+' .traffic_text').html(ret_out.toString().toSize()+'/s | '+ret_in.toString().toSize()+'/s');
  },
  update_status : function(tab,d){
    data = $.extend(d.status,d.variables);
    
    $.each(data,function(i,n){
      if(i.substr(0,5) == 'Uptim')
        n = n.toHHMMSS();
      if(i.substr(0,5) == 'Bytes')           
        n = n.toSize();             
      
      $('.'+tab+' .'+i.toLowerCase()).html(n);
    });
  },
  update_keyefficiency : function(tab,d){
    var self = tabs[tab].keyefficiency;
    var eff = 100 - (d.status.Key_reads / d.status.Key_read_requests * 100);
    
    $('.'+tab+' .key-efficiency').html(Math.round(eff * 100) / 100+'%');
  },
  update_queries : function(tab,d){
    var self = tabs[tab].query;
    var total = 0;
    var data = [];
    
    $.each(d.status,function(i,n){
      i = i.toLowerCase();
      if(self[i] !== undefined){
        if(self[i] == 0){
          self[i] = n;
        } else {
          $('.'+tab+' .'+i).html(n-self[i]);
          self[i] = n; 
        }
        total += parseInt(n);
      }
    });
    
    $.each(self,function(i,n){
      var value = (n/total)*100;
      if(value > 1){
        data.push([i,value]);
      }
    });
    
    tabs[tab].queries.series[0].setData(data);
  },
  update_innodb : function(tab,d){
    var self = tabs[tab].innodb;
    
    $.each(d.status,function(i,n){
      i = i.toLowerCase();
      if(self[i] !== undefined){
        if(self[i] == 0){
          self[i] = n;
        } else {
          $('.'+tab+' .'+i).html(n-self[i]);
          self[i] = n; 
        }
      }
    });
  }
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
