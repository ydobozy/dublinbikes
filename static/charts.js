drawOccupancyWeekly = (station_number, chartOptions = darkChart) => {
  console.log('Drawing Occupancy for graph')
    // this is called when the user clicks on the marker
    // use google charts to draw a chart at the bottom of the page
    if (hourlyChart) {
      console.log('hourly')  
    fetch("/hourlyOccupancy/" + station_number)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          let chart_data = new google.visualization.DataTable();
          chart_data.addColumn("string", "Hours");
          chart_data.addColumn("number", "Monday");
          chart_data.addColumn("number", "Tuesday");
          chart_data.addColumn("number", "Wednesday");
          chart_data.addColumn("number", "Thursday");
          chart_data.addColumn("number", "Friday");
          chart_data.addColumn("number", "Saturday");
          chart_data.addColumn("number", "Sunday");
          data.forEach((v) => {
            chart_data.addRow([v.hours, v.Monday, v.Tuesday, v.Wednesday, v.Thursday, v.Friday, v.Saturday, v.Sunday]);
          });
          var chart = new google.visualization.LineChart(
            document.getElementById("chart_div")
          );
          chart.draw(chart_data, chartOptions);
      });
    }
    if (dailyChart) {
      console.log('daily');
      fetch("/dailyOccupancy/" + station_number)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let chart_data = new google.visualization.DataTable();
        chart_data.addColumn("string", "Days");
        chart_data.addColumn("number", "Weekly");
      
        data.forEach((v) => {
          chart_data.addRow([v.last_update, v.available_bikes]);
        });
        var chart = new google.visualization.LineChart(
          document.getElementById("chart_div")
        );
        chart.draw(chart_data, chartOptions);
        }
      )};
};
