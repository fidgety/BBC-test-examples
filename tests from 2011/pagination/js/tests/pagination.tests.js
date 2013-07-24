(function() {

var html,
    pagination,
    mockJSON = {
      items:[
        'first description',
        'second description',
        'third description',
        'fourth description'
      ]    
    };

module("Pagination", {

		setup: function() {

		html = document.createElement('table');
		html.className = '';
		
	  html.innerHTML = '<div class="description"></div>' +
											 '<a href="#" class="previous">Previous</a>' +
											 '<ul>' +
                       '<li><a href="#"><span class="number"></span></a></li>' +
											 '</ul>' +
											 '<a href="#" class="next">Next</a>' +
														
	  document.body.appendChild(html);

    Pagination.prototype._getJSON = function(){
        this._jsonReceived(mockJSON);
    };
    
    pagination = new Pagination(html);

	},

	teardown: function() {
 			html.parentNode.removeChild(html);
		  delete html;
	}

});

test("Pagination object can be instantiated", function() {
  equal( pagination.toString(),  '[object Pagination]', 'object created' );
});

test("JSON can be retrieved", function() {
  equal( pagination._descriptions.length,  4, 'json loaded' );
});

test("an li element is created for each item", function() {
  equal( $('li', html).length,  4, 'items created' );
});

test("each element is numbered", function() {
  equal( $('li:eq(3) .number', html).text(),  '4', 'index set' );
});

test("first item is selected when set up", function() {
  equal( $('li:eq(0)', html).get(0).className,  'selected', 'set' );
});

test("when item is selected other items are unselected", function() {
  pagination.setCurrentIndex(2);
  
  equal( $('li:eq(0)', html).get(0).className,  '', 'removed' );
  equal( $('li:eq(2)', html).get(0).className,  'selected', 'set' );
});

test("when item is selected description is shown", function() {
  pagination.setCurrentIndex(3);

  equal( $('.description', html).text(),  'fourth description', 'set' );
});

test("clicking next will move onto the next item", function() {
  pagination.next();
  equal(pagination.currentindex,  1, 'ok' );
});

test("clicking next when on the last item will set the first item", function() {
  pagination.setCurrentIndex(3);
  pagination.next();
  equal(pagination.currentindex,  0, 'ok' );
});

test("clicking pervious will move onto the previous item", function() {
  pagination.setCurrentIndex(3);
  pagination.previous();
  equal(pagination.currentindex,  2, 'ok' );
});

test("clicking previous when on the first item will set the last item", function() {
  pagination.previous();
  equal(pagination.currentindex,  3, 'ok' );
});


}())