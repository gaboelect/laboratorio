google.charts.load("current", {packages:["corechart"]});

var appEstadisticas = new Vue({

    el: "#frmEstadistica",
    data:{

    },
    methods: {


      PieChart: function(Array) {

            google.charts.setOnLoadCallback(drawChart);
              function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn("string", "Servicios");
                data.addColumn("number", "Ventas");
                data.addRows(Array);

                var options = {
                  title: 'Porcentaje de Ventas',
                  pieHole: 0.4,
                  backgroundColor: '#0071f1',
                  is3D: true,

                };
        
                var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                chart.draw(data, options);
              }
            
        },
        ColumnChart:function (Array) {
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn("string", "Servicios");
                data.addColumn("number", "Cantidad");
                data.addColumn({ role: 'style' });
                data.addRows(Array);

                var options = {
                  title: 'Mas Vendido',
                  pieHole: 0.4,
                  backgroundColor: '#0071f1',
                  is3D: true,

                };
        
                var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_values'));
                chart.draw(data, options);
              }
        }


    },
    created:function () {

        fetch(`private/Modulos/Estadisticas/procesos.php?proceso=traer_estadisticaPie`).then(resp => resp.json()).then(resp => {

          this.PieChart(resp);

        });
        
        fetch(`private/Modulos/Estadisticas/procesos.php?proceso=traer_estadisticaColum`).then(resp => resp.json()).then(resp => {
          this.ColumnChart(resp);
          

        });
    }
});
