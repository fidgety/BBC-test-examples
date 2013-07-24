
function DataTable(html)
{
  this._html = $(html);

  this._percentages = [];
  this._labels = [];
  
  this.parseTableForData();  
};

DataTable.prototype = {

  selectors: {
    label: 'th',
    percentage: 'td'
  },
  
  parseTableForData: function() {
      var labels = $(this.selectors.label, this._html),
          percentages = $(this.selectors.percentage, this._html),
          len = labels.length,
          i = 0,
          data = [];
          
      for (;i < len; i++) {
          this._percentages.push(parseInt(percentages[i].innerHTML));
          this._labels.push(labels[i].innerHTML);  
      } 
      
      return data;   
  },
  
  getLabels: function() {
      return this._labels;
  },
  
  getPercentages: function() {
      return this._percentages;
  },
  
  getCaption: function() {
      var caption = this._html.get(0).caption.innerHTML;
      return caption || '';
  },
  
  getPosition: function() {
      return this._html.offset();
  },
  
  getDimensions: function() {
      return {
          width: this._html.width(),
          height: this._html.height()
      };
  },
  
  toString: function() {
      return '[object DataTable]';
  }
    
    
};
