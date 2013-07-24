var Pagination = function(htmlnode, jsonfeed, callback){
  this._html = htmlnode;
  this._entries = jsonfeed.entries;
  this._callback = callback;
  
  this.MAXIMUMENTRIES = 7; // avoid magic numbers
  
  this.createListElementsForEntries(this._entries);
  this.addPreviousLink();
  this.addNextLink();
  
  this.currentItem = 1;
  
  this.addEventListners();
  
  this.selectItem(this.currentItem);  
};

Pagination.prototype = {
  selectItem: function(index){
    var numberedlist = $('.numbered-link', this._html),
        previouslink = $('.previous-link', this._html),
        nextlink = $('.next-link', this._html);
    
    numberedlist
      .not('eq:' + index - 1)
      .removeClass('inactive')
      .addClass('active')
    numberedlist
      .eq(index - 1)
        .removeClass('active')
        .addClass('inactive');
      
    if(index === 1) {
      previouslink.removeClass('active').addClass('inactive');  
    }
    else {
      previouslink.addClass('active').removeClass('inactive');
    }
    
    if(index === numberedlist.length) {
      nextlink.removeClass('active').addClass('inactive');  
    }
    else {
      nextlink.addClass('active').removeClass('inactive');
    }
    
    this.currentItem = index; 
    
    if (typeof this._callback === 'function') {
      this._callback(this._entries[index - 1]);
    }
  },
  
  createListElementsForEntries: function(entries) {
    var unorderedlist = $('<ul></ul>'),
        _this = this;
    
    $(entries).each(function(i, entry){
      if (i < _this.MAXIMUMENTRIES) {
        var numberedLinkText = i + 1;
      
        $(unorderedlist).append('<li class="numbered-link" data-index="' + numberedLinkText + '">' + numberedLinkText + '</li>');
      }    
    });
    
    $(this._html).append(unorderedlist);
  },
  
  selectNextItem: function(){
    this.selectItem(this.currentItem + 1);   
  },
  
  selectPreviousItem: function(){
    this.selectItem(this.currentItem - 1); 
  },
  
  isActive: function(item) {
    return $(item).hasClass('active');
  },
  
  addEventListners: function(){
    var _this = this;
    
    $('.numbered-link', this._html).click(function(){
      if (_this.isActive(this)){
        var itemIndex = $(this).data('index');
        _this.selectItem(itemIndex);  
      }
    });
    
    $('.previous-link', this._html).click(function(){    
      if (_this.isActive(this)){
        _this.selectPreviousItem();
      }
    });
    $('.next-link', this._html).click(function(){           
      if (_this.isActive(this)){
        _this.selectNextItem();
      }
    });
        
  },
  
  addNextLink: function(){
    $(this._html).append('<li class="next-link">next</li>');
  },
  
  addPreviousLink: function(){                
    $(this._html).prepend('<li class="previous-link">previous</li>');
  },
  
  toString: function(){
    return '[Object Pagination]';
  }
};