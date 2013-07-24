
function Pagination(html, window)
{
  this._html = html;
  this.currentindex = 0;
  
  this._descriptions = [];
  
  this._getJSON();
    
  // to handle jsonp for example, would not be used in finished version.
  var _this = this;
  exampleitems = function(json) {
      _this._jsonReceived(json);
  }
};

Pagination.prototype = {

  selectors: {
      itemholder: 'ul',
      item: 'ul li',
      indexlabel: '.number',
      descriptionfield: '.description',
      nextbutton: '.next',
      previousbutton: '.previous'
  },
  
  _getJSON: function() {
      var _this = this;
  
      $.ajax({
          url: 'jsonp.js',
          dataType: 'jsonp',
          jsonp: 'exampleitems',
          success: function(json) {
              _this._jsonReceived(json);
          }
      });
  },
  
  _getMaxIndex: function() {
      return this._descriptions.length;
  },
  
  _jsonReceived: function(json) {
      this._descriptions = json.items;
      this.maxindex = this._descriptions.length;
      this._setUpPaginationHTML();
      this._setUpClickEventHandlers();    
  },
 
  _setUpPaginationHTML: function() {
      var maxindex = this._getMaxIndex();
          exampleitem = $(this.selectors.item, this._html).remove(),
          i = 0;
        
      for (; i < maxindex; i++) {
          var newitem = exampleitem.clone();
          
          $(this.selectors.indexlabel, newitem).text(i + 1);
          
          $(this.selectors.itemholder, this._html).append(newitem);    
      }
      
      this.setCurrentIndex(0);    
  },
  
  setCurrentIndex: function(index){
      var maxindex = this._getMaxIndex();
      
      if (typeof index == 'number') {
          this.currentindex = Math.abs((index + maxindex) % maxindex);
      }
      
      this._removeSelected();
      this._showContent(); 
      $(this.selectors.item, this._html).eq(this.currentindex).addClass('selected');  
  },
  
  next: function() {
      this.setCurrentIndex(this.currentindex + 1);
  },
  
  previous: function() {
      this.setCurrentIndex(this.currentindex - 1);
  },
     
  _showContent: function(index){
      $(this.selectors.descriptionfield, this._html).html(this._descriptions[this.currentindex]);    
  },
  
  _removeSelected: function(){
      $(this.selectors.item, this._html).removeClass('selected');
  },
  
  _setUpClickEventHandlers: function() {
      var _this = this;
      
      $(this.selectors.item, this._html).click(function(e){
          e.preventDefault();
          _this.setCurrentIndex($(this).index());
      });
      
      $(this.selectors.nextbutton, this._html).click(function(e){ 
          e.preventDefault();
          _this.next();
      });
      
      $(this.selectors.previousbutton, this._html).click(function(e){  
          e.preventDefault();
          _this.previous();
      });
  },
  
  toString: function() {
      return '[object Pagination]';
  }
    
    
};
