
function PieChart(html)
{
  this._html = $(html);
  this.datatable = new DataTable(html);
      
  this.drawChart();
  
};

PieChart.prototype = {

  selectors: {
  },
  
  drawChart: function() {
      var dt = this.datatable,
          width = dt.getDimensions().width,
          height = dt.getDimensions().height,
          top = dt.getPosition().top,
          left = dt.getPosition().left,
          newelement = $('<div id="pie" style="background: white;"></div>').appendTo(document.body);
   
      newelement.width(width).height(height).offset(dt.getPosition());
      
      var r = Raphael(newelement.get(0));

      r.text(width / 2, 20, dt.getCaption()).attr({ font: "20px sans-serif" });
      r.piechart(width / 3, width / 2.5, width / 4, dt.getPercentages(),{legend: dt.getLabels(), legendpos: "east"});      
      
  },
  
  toString: function() {
      return '[object PieChart]';
  }
    
    
};
