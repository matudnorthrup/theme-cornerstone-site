//
// autosize.js
// Theme module
//

'use strict';

(function() {
  
  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="autosize"]');


  //
  // Function
  //

  function init(el) {
    autosize(el);
  }


  //
  // Event
  //

  if (typeof autosize !== 'undefined' && toggle) {
    [].forEach.call(toggle, function(el) {
      init(el);
    });
  }

})();
//
// charts-dark.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var colors = {
    gray: {
      300: '#E3EBF6',
      600: '#95AAC9',
      700: '#6E84A3',
      800: '#152E4D',
      900: '#283E59'
    },
    primary: {
      100: '#D2DDEC',
      300: '#A6C5F7',
      700: '#2C7BE5',
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent',
  };

  var config = {
    colorScheme: ( localStorage.getItem('dashkitColorScheme') ) ? localStorage.getItem('dashkitColorScheme') : 'light'
  };


  //
  // Functions
  //

  function globalOptions() {

    // Global
    Chart.defaults.global.defaultColor = colors.gray[700];
    Chart.defaults.global.defaultFontColor = colors.gray[700];

    // Arc
    Chart.defaults.global.elements.arc.borderColor = colors.gray[800];
    Chart.defaults.global.elements.arc.hoverBorderColor = colors.gray[800];

    // yAxes
    Chart.scaleService.updateScaleDefaults('linear', {
      gridLines: {
        borderDash: [2],
        borderDashOffset: [2],
        color: colors.gray[900],
        drawBorder: false,
        drawTicks: false,
        zeroLineColor: colors.gray[900],
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2]
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        callback: function(value) {
          if ( !(value % 10) ) {
            return value
          }
        }
      }
    });
  }


  //
  // Events
  //

  if (typeof Chart !== 'undefined') {
    if (typeof demoMode == 'undefined') {
      globalOptions();
    } else {
      if (demoMode && config.colorScheme == 'dark') {
        globalOptions();
      }
    }
  }

})();
//
// charts.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var colors = {
    gray: {
      300: '#E3EBF6',
      600: '#95AAC9',
      700: '#6E84A3',
      800: '#152E4D',
      900: '#283E59'
    },
    primary: {
      100: '#D2DDEC',
      300: '#A6C5F7',
      700: '#2C7BE5',
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent',
  };

  var fonts = {
    base: 'Cerebri Sans'
  };

  var toggles = document.querySelectorAll('[data-toggle="chart"]');
  var legends = document.querySelectorAll('[data-toggle="legend"]');

  //
  // Functions
  //

  function globalOptions() {

    // Global
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;

    // Default
    Chart.defaults.global.defaultColor = colors.gray[600];
    Chart.defaults.global.defaultFontColor = colors.gray[600];
    Chart.defaults.global.defaultFontFamily = fonts.base;
    Chart.defaults.global.defaultFontSize = 13;

    // Layout
    Chart.defaults.global.layout.padding = 0;

    // Legend
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.legend.position = 'bottom';
    Chart.defaults.global.legend.labels.usePointStyle = true;
    Chart.defaults.global.legend.labels.padding = 16;

    // Point
    Chart.defaults.global.elements.point.radius = 0;
    Chart.defaults.global.elements.point.backgroundColor = colors.primary[700];

    // Line
    Chart.defaults.global.elements.line.tension = .4;
    Chart.defaults.global.elements.line.borderWidth = 3;
    Chart.defaults.global.elements.line.borderColor = colors.primary[700];
    Chart.defaults.global.elements.line.backgroundColor = colors.transparent;
    Chart.defaults.global.elements.line.borderCapStyle = 'rounded';

    // Rectangle
    Chart.defaults.global.elements.rectangle.backgroundColor = colors.primary[700];
    Chart.defaults.global.elements.rectangle.maxBarThickness = 10;

    // Arc
    Chart.defaults.global.elements.arc.backgroundColor = colors.primary[700];
    Chart.defaults.global.elements.arc.borderColor = colors.white;
    Chart.defaults.global.elements.arc.borderWidth = 4;
    Chart.defaults.global.elements.arc.hoverBorderColor = colors.white;

    // Tooltips
    Chart.defaults.global.tooltips.enabled = false;
    Chart.defaults.global.tooltips.mode = 'index';
    Chart.defaults.global.tooltips.intersect = false;
    Chart.defaults.global.tooltips.custom = function(model) {
      var tooltip = document.getElementById('chart-tooltip');
      var chartType = this._chart.config.type;

      // Create tooltip if doesn't exist
      if (!tooltip) {
        tooltip = document.createElement('div');

        tooltip.setAttribute('id', 'chart-tooltip');
        tooltip.setAttribute('role', 'tooltip');
        tooltip.classList.add('popover');
        tooltip.classList.add('bs-popover-top');

        document.body.appendChild(tooltip);
      }

      // Hide tooltip if not visible
      if (model.opacity === 0) {
        tooltip.style.visibility = 'hidden';

        return;
      }

      if (model.body) {
        var title = model.title || [];
        var body = model.body.map(function(body) {
          return body.lines;
        });

        // Add arrow
        var content = '<div class="arrow"></div>';

        // Add title
        title.forEach(function(title) {
          content += '<h3 class="popover-header text-center">' + title + '</h3>';
        });

        // Add content
        body.forEach(function(body, i) {
          var colors = model.labelColors[i];
          var indicatorColor = (chartType === 'line' && colors.borderColor !== 'rgba(0,0,0,0.1)') ? colors.borderColor : colors.backgroundColor;
          var indicator = '<span class="popover-body-indicator" style="background-color: ' + indicatorColor + '"></span>';
          var justifyContent = (body.length > 1) ? 'justify-content-left' : 'justify-content-center';

          content += '<div class="popover-body d-flex align-items-center ' + justifyContent + '">' + indicator + body + '</div>';
        });

        tooltip.innerHTML = content;
      }

      var canvas = this._chart.canvas;
      var canvasRect = canvas.getBoundingClientRect();

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

      var canvasTop = canvasRect.top + scrollTop;
      var canvasLeft = canvasRect.left + scrollLeft;

      var tooltipWidth = tooltip.offsetWidth;
      var tooltipHeight = tooltip.offsetHeight;

      var top = canvasTop + model.caretY - tooltipHeight - 16;
      var left = canvasLeft + model.caretX - tooltipWidth / 2;

      tooltip.style.top = top + 'px';
      tooltip.style.left = left + 'px';
      tooltip.style.visibility = 'visible';
    };

    Chart.defaults.global.tooltips.callbacks.label = function(item, data) {
      var content = '';

      var value = item.yLabel;
      var dataset = data.datasets[item.datasetIndex]
      var label = dataset.label;

      var yAxisID = dataset.yAxisID ? dataset.yAxisID : 0;
      var yAxes = this._chart.options.scales.yAxes;
      var yAxis = yAxes[0];

      if (yAxisID) {
        var yAxis = yAxes.filter(function(item) {
          return item.id == yAxisID;
        })[0];
      }

      var callback = yAxis.ticks.callback;

      var activeDatasets = data.datasets.filter(function(dataset) {
        return !dataset.hidden;
      });

      if (activeDatasets.length > 1) {
        content = '<span class="popover-body-label mr-auto">' + label + '</span>';
      }

      content += '<span class="popover-body-value">' + callback(value) + '</span>';

      return content;
    };

    // Doughnut
    Chart.defaults.doughnut.cutoutPercentage = 83;
    Chart.defaults.doughnut.tooltips.callbacks.title = function(item, data) {
      return data.labels[item[0].index];
    };
    Chart.defaults.doughnut.tooltips.callbacks.label = function(item, data) {
      var value = data.datasets[0].data[item.index];
      var callbacks = this._chart.options.tooltips.callbacks;
      var afterLabel = callbacks.afterLabel() ? callbacks.afterLabel() : '';
      var beforeLabel = callbacks.beforeLabel() ? callbacks.beforeLabel() : '';

      return '<span class="popover-body-value">' + beforeLabel + value + afterLabel + '</span>';
    };
    Chart.defaults.doughnut.legendCallback = function(chart) {
      var data = chart.data;
      var content = '';

      data.labels.forEach(function(label, index) {
        var bgColor = data.datasets[0].backgroundColor[index];

        content += '<span class="chart-legend-item">';
        content += '<i class="chart-legend-indicator" style="background-color: ' + bgColor + '"></i>';
        content += label;
        content += '</span>';
      });

      return content;
    };

    // yAxes
    Chart.scaleService.updateScaleDefaults('linear', {
      gridLines: {
        borderDash: [2],
        borderDashOffset: [2],
        color: colors.gray[300],
        drawBorder: false,
        drawTicks: false,
        zeroLineColor: colors.gray[300],
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2]
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        stepSize: 10
      }
    });

    // xAxes
    Chart.scaleService.updateScaleDefaults('category', {
      gridLines: {
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: false
      },
      ticks: {
        padding: 20
      }
    });
  }

  function getChartInstance(chart) {
    var chartInstance = undefined;

    Chart.helpers.each(Chart.instances, function(instance) {
      if (chart == instance.chart.canvas) {
        chartInstance = instance;
      }
    });

    return chartInstance;
  }

  function toggleDataset(toggle) {
    var id = toggle.dataset.target;
    var action = toggle.dataset.action;
    var index = parseInt(toggle.dataset.dataset);

    var chart = document.querySelector(id);
    var chartInstance = getChartInstance(chart);

    // Action: Toggle
    if (action === 'toggle') {
      var datasets = chartInstance.data.datasets;

      var activeDataset = datasets.filter(function(dataset) {
        return !dataset.hidden;
      })[0];

      var backupDataset = datasets.filter(function(dataset) {
        return dataset.order === 1000;
      })[0];

      // Backup active dataset
      if (!backupDataset) {
        backupDataset = {};

        for (var prop in activeDataset) {
          if (prop !== '_meta') {
            backupDataset[prop] = activeDataset[prop];
          }
        }

        backupDataset.order = 1000;
        backupDataset.hidden = true;

        // Push to the dataset list
        datasets.push(backupDataset);
      }

      // Toggle dataset
      var sourceDataset = (datasets[index] === activeDataset) ? backupDataset : datasets[index];

      for (var prop in activeDataset) {
        if (prop !== '_meta') {
          activeDataset[prop] = sourceDataset[prop];
        }
      }

      // Update chart
      chartInstance.update();
    }

    // Action: Add
    if (action === 'add') {
      var dataset = chartInstance.data.datasets[index];
      var isHidden = dataset.hidden;

      // Toggle dataset
      dataset.hidden = !isHidden;
    }

    // Update chart
    chartInstance.update();
  }

  function toggleLegend(legend) {
    var chart = getChartInstance(legend);
    var content = chart.generateLegend();

    var id = legend.dataset.target;
    var container = document.querySelector(id);

    container.innerHTML = content;
  }

  //
  // Events
  //

  if (typeof Chart !== 'undefined') {

    // Global options
    globalOptions();

    // Toggle dataset
    if (toggles) {
      [].forEach.call(toggles, function(toggle) {
        var event = toggle.dataset.trigger;

        toggle.addEventListener(event, function() {
          toggleDataset(toggle);
        });

      });
    }

    // Toggle legend
    if (legends) {
      document.addEventListener('DOMContentLoaded', function() {
        [].forEach.call(legends, function(legend) {
          toggleLegend(legend);
        });
      });
    }
  }
})();

//
// kanban.js
// Dashkit module
//

'use strict';

(function() {

  //
  // Variables
  //

  var checklist = document.querySelectorAll('.checklist');

  //
  // Functions
  //

  function init(checklist) {
    new Draggable.Sortable(checklist, {
      draggable: '.checklist-control',
      handle: '.custom-control-caption',
      mirror: {
        constrainDimensions: true
      }
    });
  }

  //
  // Events
  //

  if (typeof Draggable !== 'undefined' && checklist) {
    init(checklist);
  }

})();

//
// dashkit.js
//

'use strict';

// Audience chart

(function() {
  var chart = document.getElementById('audienceChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            id: 'yAxisOne',
            type: 'linear',
            display: 'auto',
            gridLines: {
              color: '#283E59',
              zeroLineColor: '#283E59'
            },
            ticks: {
              callback: function(value) {
                return value + 'k';
              }
            }
          }, {
            id: 'yAxisTwo',
            type: 'linear',
            display: 'auto',
            gridLines: {
              color: '#283E59',
              zeroLineColor: '#283E59'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Customers',
          data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40],
          yAxisID: 'yAxisOne'
        }, {
          label: 'Sessions',
          data: [50, 75, 35, 25, 55, 87, 67, 53, 25, 80, 87, 45],
          yAxisID: 'yAxisOne',
          hidden: true
        }, {
          label: 'Conversion',
          data: [40, 57, 25, 50, 57, 32, 46, 28, 59, 34, 52, 48],
          yAxisID: 'yAxisTwo',
          hidden: true
        }]
      }
    });
  }
})();

// Convertions chart

(function() {
  var chart = document.getElementById('conversionsChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11', 'Oct 12'],
        datasets: [{
          label: '2020',
          data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32]
        }, {
          label: '2019',
          data: [15, 10, 20, 12, 7, 0, 8, 16, 18, 16, 10, 22],
          backgroundColor: '#d2ddec',
          hidden: true
        }]
      }
    });
  }
})();

// Traffic chart

(function() {
  var chart = document.getElementById('trafficChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'doughnut',
      options: {
        tooltips: {
          callbacks: {
            afterLabel: function() {
              return '%'
            }
          }
        }
      },
      data: {
        labels: ['Direct', 'Organic', 'Referral'],
        datasets: [{
          data: [60, 25, 15],
          backgroundColor: ['#2C7BE5', '#A6C5F7', '#D2DDEC']
        }, {
          data: [15, 45, 20],
          backgroundColor: ['#2C7BE5', '#A6C5F7', '#D2DDEC'],
          hidden: true
        }]
      }
    });
  }
})();

// Traffic chart (alt)

(function() {
  var chart = document.getElementById('trafficChartAlt');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'doughnut',
      options: {
        tooltips: {
          callbacks: {
            afterLabel: function() {
              return '%'
            }
          }
        }
      },
      data: {
        labels: ['Direct', 'Organic', 'Referral'],
        datasets: [{
          data: [60, 25, 15],
          backgroundColor: ['#2C7BE5', '#A6C5F7', '#D2DDEC']
        }, {
          data: [15, 45, 20],
          backgroundColor: ['#2C7BE5', '#A6C5F7', '#D2DDEC'],
          hidden: true
        }]
      }
    });
  }
})();

// Sales chart

(function() {
  var chart = document.getElementById('salesChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return '$' + value + 'k';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Oct 1', 'Oct 3', 'Oct 6', 'Oct 9', 'Oct 12', 'Oct 5', 'Oct 18', 'Oct 21', 'Oct 24', 'Oct 27', 'Oct 30'],
        datasets: [{
          label: 'All',
          data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25]
        }, {
          label: 'Direct',
          data: [7, 40, 12, 27, 34, 17, 19, 30, 28, 32, 24],
          hidden: true
        }, {
          label: 'Organic',
          data: [2, 12, 35, 25, 36, 25, 34, 16, 4, 14, 15],
          hidden: true
        }]
      }
    });
  }
})();

// Orders chart

(function() {
  var chart = document.getElementById('ordersChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return '$' + value + 'k';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales',
          data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32]
        }, {
          label: 'Affiliate',
          data: [15, 10, 20, 12, 7, 0, 8, 16, 18, 16, 10, 22],
          backgroundColor: '#d2ddec',
          hidden: true
        }]
      }
    });
  }
})();

// Earnings chart

(function() {
  var chart = document.getElementById('earningsChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            id: 'yAxisOne',
            type: 'linear',
            display: 'auto',
            ticks: {
              callback: function(value) {
                return '$' + value + 'k';
              }
            }
          }, {
            id: 'yAxisTwo',
            type: 'linear',
            display: 'auto',
            ticks: {
              callback: function(value) {
                return value + 'k';
              }
            }
          }, {
            id: 'yAxisThree',
            type: 'linear',
            display: 'auto',
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Earnings',
          data: [18, 10, 5, 15, 10, 20, 15, 25, 20, 26, 25, 29, 18, 10, 5, 15, 10, 20],
          yAxisID: 'yAxisOne'
        }, {
          label: 'Sessions',
          data: [50, 75, 35, 25, 55, 87, 67, 53, 25, 80, 87, 45, 50, 75, 35, 25, 55, 19],
          yAxisID: 'yAxisTwo',
          hidden: true
        }, {
          label: 'Bounce',
          data: [40, 57, 25, 50, 57, 32, 46, 28, 59, 34, 52, 48, 40, 57, 25, 50, 57, 29],
          yAxisID: 'yAxisThree',
          hidden: true
        }]
      }
    });
  }
})();

// Weekly hours chart

(function() {
  var chart = document.getElementById('weeklyHoursChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return value + 'hrs';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [21, 12, 28, 15, 5, 12, 17, 2]
        }]
      }
    });
  }
})();

// Overview chart

(function() {
  var chart = document.getElementById('overviewChart');

  if (chart) {
    new Chart(chart, {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            id: 'yAxisOne',
            type: 'linear',
            display: 'auto',
            ticks: {
              callback: function(value) {
                return '$' + value + 'k';
              }
            }
          }, {
            id: 'yAxisTwo',
            type: 'linear',
            display: 'auto',
            ticks: {
              callback: function(value) {
                return value + 'hrs';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Earned',
          data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40],
          yAxisID: 'yAxisOne'
        }, {
          label: 'Hours Worked',
          data: [7, 35, 12, 27, 34, 17, 19, 30, 28, 32, 24, 39],
          yAxisID: 'yAxisTwo',
          hidden: true
        }]
      }
    });
  }
})();

// Sparkline chart

(function() {
  var chart = document.getElementById('sparklineChart');

  if (typeof Chart !== 'undefined' && chart) {
    new Chart(chart, {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            display: false
          }],
          xAxes: [{
            display: false
          }]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            hoverRadius: 0
          }
        },
        tooltips: {
          custom: function() {
            return false;
          }
        }
      },
      data: {
        labels: new Array(12),
        datasets: [{
          data: [0, 15, 10, 25, 30, 15, 40, 50, 80, 60, 55, 65]
        }]
      }
    });
  }
})();

// Sparkline chart (gray)

(function() {
  var charts = document.querySelectorAll('#sparklineChartSocialOne, #sparklineChartSocialTwo, #sparklineChartSocialThree, #sparklineChartSocialFour');

  if (typeof Chart !== 'undefined' && charts) {
    [].forEach.call(charts, function(chart) {
      new Chart(chart, {
        type: 'line',
        options: {
          scales: {
            yAxes: [{
              display: false
            }],
            xAxes: [{
              display: false
            }]
          },
          elements: {
            line: {
              borderWidth: 2,
              borderColor: '#D2DDEC'
            },
            point: {
              hoverRadius: 0
            }
          },
          tooltips: {
            custom: function() {
              return false;
            }
          }
        },
        data: {
          labels: new Array(12),
          datasets: [{
            data: [0, 15, 10, 25, 30, 15, 40, 50, 80, 60, 55, 65]
          }]
        }
      });
    });
  }
})();

// Feed chart

(function() {
  var chart = document.getElementById('feedChart');

  if (chart) {
    new Chart(chart, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return '$' + value + 'k';
              }
            }
          }]
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales',
          data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32]
        }, {
          label: 'Affiliate',
          data: [15, 10, 20, 12, 7, 0, 8, 16, 18, 16, 10, 22],
          backgroundColor: '#d2ddec',
          hidden: true
        }]
      }
    });
  }
})();

// Orders select

(function() {
  var ordersSelect = document.querySelectorAll('[name="ordersSelect"]');
  var ordersSelectAll = document.getElementById('ordersSelectAll');

  if (ordersSelect && ordersSelectAll) {
    ordersSelectAll.addEventListener('change', function() {
      var that = this;

      [].forEach.call(ordersSelect, function(checkbox) {
        checkbox.checked = that.checked;
      });
    });
  }
})();

//
// demo.js
// Theme module
//

'use strict';

var demoMode = (function() {

  //
  // Variables
  //

  var popover = document.querySelector('#popoverDemo');
  var form = document.querySelector('#demoForm');
  var topnav = document.querySelector('#topnav');
  var topbar = document.querySelector('#topbar');
  var sidebar = document.querySelector('#sidebar');
  var sidebarSmall = document.querySelector('#sidebarSmall');
  var sidebarUser = document.querySelector('#sidebarUser');
  var sidebarUserSmall = document.querySelector('#sidebarSmallUser');
  var sidebarSizeContainer = document.querySelector('#sidebarSizeContainer')
  var navPositionToggle = document.querySelectorAll('input[name="navPosition"]');
  var containers = document.querySelectorAll('[class^="container"]');
  var stylesheetLight = document.querySelector('#stylesheetLight');
  var stylesheetDark = document.querySelector('#stylesheetDark');

  var config = {
    showPopover: (localStorage.getItem('dashkitShowPopover')) ? localStorage.getItem('dashkitShowPopover') : true,
    colorScheme: (localStorage.getItem('dashkitColorScheme')) ? localStorage.getItem('dashkitColorScheme') : 'light',
    navPosition: (localStorage.getItem('dashkitNavPosition')) ? localStorage.getItem('dashkitNavPosition') : 'sidenav',
    navColor: (localStorage.getItem('dashkitNavColor')) ? localStorage.getItem('dashkitNavColor') : 'default',
    sidebarSize: (localStorage.getItem('dashkitSidebarSize')) ? localStorage.getItem('dashkitSidebarSize') : 'base'
  }

  //
  // Functions
  //

  function togglePopover() {
    if (popover) {
      var showPopover = JSON.parse(config.showPopover) && config.sidebarSize === 'base';

      // Show popover on load
      if (showPopover) {
        $(popover).popover({
          'boundary': 'viewport',
          'offset': '50px',
          'placement': 'top',
          'template': '<div class="popover popover-lg popover-dark d-none d-md-block" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }).popover('show');
      }

      // Hide popover on click
      popover.addEventListener('click', function() {
        $(popover).popover('hide');

        localStorage.setItem('dashkitShowPopover', false);
      });
    }
  }

  function parseUrl() {
    var search = window.location.search.substring(1);
    var params = search.split('&');

    for (var i = 0; i < params.length; i++) {
      var arr = params[i].split('=');
      var prop = arr[0];
      var val = arr[1];

      if (prop == 'colorScheme' || prop == 'navPosition' || prop == 'navColor' || prop == 'sidebarSize') {

        // Save to localStorage
        localStorage.setItem('dashkit' + prop.charAt(0).toUpperCase() + prop.slice(1), val);

        // Update local variables
        config[prop] = val;
      }
    }
  }

  function toggleColorScheme(colorScheme) {
    if (colorScheme == 'light') {
      stylesheetLight.disabled = false;
      stylesheetDark.disabled = true;
      colorScheme = 'light';
    } else if (colorScheme == 'dark') {
      stylesheetLight.disabled = true;
      stylesheetDark.disabled = false;
      colorScheme = 'dark';
    }
  }

  function toggleNavPosition(navPosition) {
    if (topnav && topbar && sidebar && sidebarSmall && sidebarUser && sidebarUserSmall) {
      if (navPosition == 'topnav') {
        hideNode(topbar);
        hideNode(sidebar);
        hideNode(sidebarSmall);

        for (var i = 0; i < containers.length; i++) {
          containers[i].classList.remove('container-fluid');
          containers[i].classList.add('container');
        }
      } else if (navPosition == 'combo') {
        hideNode(topnav);
        hideNode(sidebarUser);
        hideNode(sidebarUserSmall);

        for (var i = 0; i < containers.length; i++) {
          containers[i].classList.remove('container');
          containers[i].classList.add('container-fluid');
        }
      } else if (navPosition == 'sidenav') {
        hideNode(topnav);
        hideNode(topbar);

        for (var i = 0; i < containers.length; i++) {
          containers[i].classList.remove('container');
          containers[i].classList.add('container-fluid');
        }
      }
    }
  }

  function toggleNavColor(navColor) {

    if (sidebar && sidebarSmall && topnav) {

      if (navColor == 'default') {

        // Sidebar
        sidebar.classList.add('navbar-light');

        // Sidebar small
        sidebarSmall.classList.add('navbar-light');

        // Topnav
        topnav.classList.add('navbar-light');

      } else if (navColor == 'inverted') {

        // Sidebar
        sidebar.classList.add('navbar-dark');

        // Sidebar small
        sidebarSmall.classList.add('navbar-dark');

        // Topnav
        topnav.classList.add('navbar-dark');

      } else if (navColor == 'vibrant') {

        // Sidebar
        sidebar.classList.add('navbar-dark', 'navbar-vibrant');

        // Sidebar small
        sidebarSmall.classList.add('navbar-dark', 'navbar-vibrant');

        // Sidebar small
        topnav.classList.add('navbar-dark', 'navbar-vibrant');

      }
    }
  }

  function toggleSidebarSize(sidebarSize) {
    if (sidebarSize == 'base') {
      hideNode(sidebarSmall);
    } else if (sidebarSize == 'small') {
      hideNode(sidebar);
    }
  }

  function toggleFormControls(form, colorScheme, navPosition, navColor, sidebarSize) {
    $(form).find('[name="colorScheme"][value="' + colorScheme + '"]').closest('.btn').button('toggle');
    $(form).find('[name="navPosition"][value="' + navPosition + '"]').closest('.btn').button('toggle');
    $(form).find('[name="navColor"][value="' + navColor + '"]').closest('.btn').button('toggle');
    $(form).find('[name="sidebarSize"][value="' + sidebarSize + '"]').closest('.btn').button('toggle');
  }

  function toggleSidebarSizeCongainer(navPosition) {
    if (navPosition == 'topnav') {
      $(sidebarSizeContainer).collapse('hide');
    } else {
      $(sidebarSizeContainer).collapse('show');
    }
  }

  function submitForm(form) {
    var colorScheme = form.querySelector('[name="colorScheme"]:checked').value;
    var navPosition = form.querySelector('[name="navPosition"]:checked').value;
    var navColor = form.querySelector('[name="navColor"]:checked').value;
    var sidebarSize = form.querySelector('[name="sidebarSize"]:checked').value;

    // Save data to localStorage
    localStorage.setItem('dashkitColorScheme', colorScheme);
    localStorage.setItem('dashkitNavPosition', navPosition);
    localStorage.setItem('dashkitNavColor', navColor);
    localStorage.setItem('dashkitSidebarSize', sidebarSize);

    // Reload page
    window.location = window.location.pathname;
  }

  function hideNode(node) {
    node && node.setAttribute('style', 'display: none !important');
  }

  //
  // Event
  //

  // Toggle popover
  togglePopover();

  // Parse url
  parseUrl();

  // Toggle color scheme
  toggleColorScheme(config.colorScheme);

  // Toggle nav position
  toggleNavPosition(config.navPosition);

  // Toggle sidebar color
  toggleNavColor(config.navColor);

  // Toggle sidebar size
  toggleSidebarSize(config.sidebarSize);

  // Toggle form controls
  toggleFormControls(form, config.colorScheme, config.navPosition, config.navColor, config.sidebarSize);

  // Toggle sidebarSize container
  toggleSidebarSizeCongainer(config.navPosition);

  // Enable body
  document.body.style.display = 'block';

  if (form) {

    // Form submitted
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      submitForm(form);
    });

    // Nav position changed
    [].forEach.call(navPositionToggle, function(el) {
      el.parentElement.addEventListener('click', function() {
        var navPosition = el.value;
        toggleSidebarSizeCongainer(navPosition);
      });
    });
  }

  //
  // Return
  //

  return true;

})();

//
// dropdowns.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var dropdown = document.querySelectorAll('.dropup, .dropright, .dropdown, .dropleft');
  var dropdownSubmenuToggle = document.querySelectorAll('.dropdown-menu .dropdown-toggle');


  //
  // Functions
  //

  function toggleSubmenu(el) {
    var dropdownMenu = el.parentElement.querySelector('.dropdown-menu');
    var dropdownMenuSiblings = el.closest('.dropdown-menu').querySelectorAll('.dropdown-menu');

    [].forEach.call(dropdownMenuSiblings, function(el) {
      if (el !== dropdownMenu) {
        el.classList.remove('show');
      }
    });

    dropdownMenu.classList.toggle('show');
  }

  function hideSubmenu(el) {
    var dropdownSubmenus = el.querySelectorAll('.dropdown-menu');

    if (dropdownSubmenus) {
      [].forEach.call(dropdownSubmenus, function(el) {
        el.classList.remove('show');
      });
    }
  }


  //
  // Events
  //

  if (dropdownSubmenuToggle) {
    [].forEach.call(dropdownSubmenuToggle, function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        toggleSubmenu(el);
        e.stopPropagation();
      });
    });
  }

  $(dropdown).on('hide.bs.dropdown', function() {
    hideSubmenu(this);
  });

})();
//
// dropzone.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="dropzone"]');

  //
  // Functions
  //

  function globalOptions() {
    Dropzone.autoDiscover = false;
    Dropzone.thumbnailWidth = null;
    Dropzone.thumbnailHeight = null;
  }

  function init(el) {
    var currentFile = undefined;

    var elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};

    var defaultOptions = {
      previewsContainer: el.querySelector('.dz-preview'),
      previewTemplate: el.querySelector('.dz-preview').innerHTML,
      init: function() {
        this.on('addedfile', function(file) {
          var maxFiles = elementOptions.maxFiles;
          if (maxFiles == 1 && currentFile) {
            this.removeFile(currentFile);
          }
          currentFile = file;
        });
      }
    }
    var options = Object.assign(defaultOptions, elementOptions);

    // Clear preview
    el.querySelector('.dz-preview').innerHTML = '';

    // Init dropzone
    new Dropzone(el, options);
  }

  //
  // Events
  //

  if (typeof Dropzone !== 'undefined' && toggle) {
    globalOptions();

    [].forEach.call(toggle, function(el) {
      init(el);
    });
  }

})();

//
// flatpickr.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="flatpickr"]');


  //
  // Functions
  //

  function init(el) {
    var options = el.dataset.options;
        options = options ? JSON.parse(options) : {};

    flatpickr(el, options);
  }


  //
  // Events
  //

  if (typeof flatpickr !== 'undefined' && toggle) {
    [].forEach.call(toggle, function(el) {
      init(el);
    });
  }

})();
//
// highlight.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var highlight = document.querySelectorAll('.highlight');


  //
  // Functions
  //

  function init(el) {
    hljs.highlightBlock(el);
  }


  //
  // Events
  //

  if (typeof hljs !== 'undefined' && highlight) {
    [].forEach.call(highlight, function(el) {
      init(el);
    });
  }

})();
//
// kanban.js
// Dashkit module
//

'use strict';

(function() {
  
  //
  // Variables
  //

  var categories = document.querySelectorAll('.kanban-category');
  var links = document.querySelectorAll('.kanban-add-link');
  var forms = document.querySelectorAll('.kanban-add-form');


  //
  // Functions
  //

  function init(categories) {
    new Draggable.Sortable(categories, {
      draggable: '.kanban-item',
      mirror: {
        constrainDimensions: true
      }
    });
  }

  function toggleItems(el) {
    var parent = el.closest('.kanban-add');
    var card = parent.querySelector('.card');
    var link = parent.querySelector('.kanban-add-link');
    var form = parent.querySelector('.kanban-add-form');

    link.classList.toggle('d-none');
    form.classList.toggle('d-none');

    if (card) {
      if (card.classList.contains('card-sm')) {
        if (card.classList.contains('card-flush')) {
          card.classList.remove('card-flush');
        } else {
          card.classList.add('card-flush');
        }
      }
    }
  }


  //
  // Events
  //

  if (typeof Draggable !== 'undefined' && categories) {
    init(categories);
  }

  if (links) {
    [].forEach.call(links, function(el) {
      el.addEventListener('click', function() {
        toggleItems(el);
      });
    });
  }

  if (forms) {
    [].forEach.call(forms, function(el) {

      // Reset
      el.addEventListener('reset', function() {
        toggleItems(el);
      });

      // Submit
      el.addEventListener('submit', function(e) {
        e.preventDefault();
      });
    });
  }

})();
//
// list.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="lists"]');
  var toggleSort = document.querySelectorAll('[data-toggle="lists"] [data-sort]');

  //
  // Functions
  //

  function init(el) {
    var options = el.dataset.options ? JSON.parse(el.dataset.options) : {};

    // Init
    new List(el, options);
  }

  //
  // Events
  //

  if (typeof List !== 'undefined') {

    if (toggle) {
      [].forEach.call(toggle, function(el) {
        init(el);
      });
    }

    if (toggleSort) {
      [].forEach.call(toggleSort, function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
        });
      });
    }
  }

})();

//
// map.js
// Theme module
//

(function() {

  //
  // Variables
  //

  var map = document.querySelectorAll('[data-toggle="map"]');
  var accessToken = 'pk.eyJ1IjoiZ29vZHRoZW1lcyIsImEiOiJjanU5eHR4N2cybDU5NGVwOHZwNGprb3E0In0.msdw9q16dh8v4azJXUdiXg';

  //
  // Methods
  //

  function init(el) {
    var elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};

    var defaultOptions = {
      container: el,
      style: 'mapbox://styles/mapbox/light-v9',
      scrollZoom: false,
      interactive: false
    }

    var options = Object.assign(defaultOptions, elementOptions);

    // Get access token
    mapboxgl.accessToken = accessToken;

    // Init map
    new mapboxgl.Map(options);
  }

  //
  // Events
  //

  if (typeof mapboxgl !== 'undefined' && map) {
    [].forEach.call(map, function(el) {
      init(el);
    });
  }

})();

//
// navbar.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var navbarToggle = document.querySelectorAll('.navbar-nav [data-toggle="collapse"]');

  //
  // Functions
  //

  function toggleAccordion(el) {
    var collapses = el.closest('.collapse').querySelectorAll('.collapse');

    [].forEach.call(collapses, function(currentEl) {
      if (currentEl !== el) {
        $(currentEl).collapse('hide');
      }
    });
  }

  //
  // Events
  //

  [].forEach.call(navbarToggle, function(el) {
    el.addEventListener('click', function() {
      toggleAccordion(el);
    });
  });

})();

//
// polyfill.js
// Theme module
//

'use strict';

//
// Closest
//

(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));
//
// popover.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="popover"]');

  //
  // Functions
  //

  function init(toggle) {
    $(toggle).popover();
  }

  //
  // Events
  //

  if (toggle) {
    init(toggle);
  }

})();

//
// quill.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="quill"]');

  //
  // Functions
  //

  function init(el) {
    var elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};

    var defaultOptions = {
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['link', 'blockquote', 'code', 'image'],
          [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }]
        ]
      },
      theme: 'snow'
    };

    var options = Object.assign(defaultOptions, elementOptions);

    new Quill(el, options);
  }

  //
  // Events
  //

  if (typeof Quill !== 'undefined' && toggle) {
    [].forEach.call(toggle, function(el) {
      init(el);
    });
  }

})();

//
// select2.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="select"]');

  //
  // Functions
  //

  function init(el) {
    var elementOptions = el.dataset.options ? JSON.parse(el.dataset.options) : {};

    var defaultOptions = {
      containerCssClass: el.getAttribute('class'),
      dropdownCssClass: 'dropdown-menu show',
      dropdownParent: el.closest('.modal') ? el.closest('.modal') : document.body,
      templateResult: formatTemplate
    };

    var options = Object.assign(defaultOptions, elementOptions);

    // Init
    $(el).select2(options);
  }

  function formatTemplate(item) {

    // Quit if there's no avatar to display
    if (!item.id || !item.element || !item.element.dataset.avatarSrc) {
      return item.text;
    }

    var avatar = item.element.dataset.avatarSrc;
    var content = document.createElement('div');

    content.innerHTML = '<span class="avatar avatar-xs mr-3"><img class="avatar-img rounded-circle" src="' + avatar + '" alt="' + item.text + '"></span><span>' + item.text + '</span>';

    return content;
  }

  //
  // Events
  //

  if (jQuery().select2 && toggle) {
    [].forEach.call(toggle, function(el) {
      init(el);
    });
  }

})();

//
// tooltip.js
// Theme module
//

'use strict';

(function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="tooltip"]');


  //
  // Functions
  //

  function init(toggle) {
    $(toggle).tooltip();
  }


  //
  // Events
  //

  if (toggle) {
    init(toggle);
  }
  
})();
//
// wizard.js
// 

'use strict';

(function() {
  var toggles = document.querySelectorAll('[data-toggle="wizard"]');

  [].forEach.call(toggles, function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();

      // Toggle tab
      $(toggle).tab('show').removeClass('active');
    });
  });
})();

(function ($) {
  var $iframes = $(".fluid-video").find("iframe");
  $iframes.each(function (index) {
    var src = $(this).attr("src");
    if (
      src.indexOf("youtube") >= 0 ||
      src.indexOf("vimeo") >= 0 ||
      src.indexOf("wistia") >= 0 ||
      src.indexOf("ustream") >= 0 ||
      src.indexOf("dailymotion") >= 0
    ) {
      $("<div class='responsive-video' id='responsive-video-" + index + "'></div>").insertBefore($(this));
      $("<div class='video-container' id='video-container-" + index + "'></div>").insertBefore($("#responsive-video-" + index));
      $("#video-container-" + index).html($("#responsive-video-" + index));
      $("#responsive-video-" + index).html($(this));
    }
  });
  $(".responsive-video").css({
    "position": "relative",
    "display": "block",
    "overflow": "hidden",
    "height": "0",
    "padding-bottom": "56.25%"
  });
  $(".responsive-video iframe").css({
    "position": "absolute",
    "top": "0",
    "bottom": "0",
    "left": "0",
    "width": "100%",
    "height": "100%",
    "border": "0",
    "background-color": "#000000"
  });
})(jQuery);
