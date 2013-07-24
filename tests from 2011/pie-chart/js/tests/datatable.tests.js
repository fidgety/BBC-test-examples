(function() {

var tablehtml,
    datatable;

module("DataTable", {

		setup: function() {

		tablehtml = document.createElement('table');
		tablehtml.className = 'data-table';
		tablehtml.style.position = 'absolute';
		tablehtml.style.top = '123px';
		tablehtml.style.left = '160px';
		
	  tablehtml.innerHTML = '<caption>this is a caption</caption>' +
											 '<tr><th>item one</th><td>40%</td>' +
											 '<tr><th>item two</th><td>20%</td>' +
											 '<tr><th>item three</th><td>17%</td>' +
											 '<tr><th>item four</th><td>23%</td>' +
														
	  document.body.appendChild(tablehtml);

    
    datatable = new DataTable(tablehtml);

	},

	teardown: function() {
 			tablehtml.parentNode.removeChild(tablehtml);
		  delete tablehtml;
	}

});

test("object can be instantiated", function() {
  equal( datatable.toString(),  '[object DataTable]', 'object created' );
});

test("table contents converted to array", function() {
  equal( datatable.getLabels()[0],  'item one', 'name found' );
});


test("values are integers", function() {
  equal( typeof datatable.getPercentages()[0],  'number', 'number' );
  equal( datatable.getPercentages()[0],  40, 'correct number set' );
});

test("caption is captured", function() {
  equal( datatable.getCaption(),  'this is a caption', 'caption found' );
});

test("can determine the position of the table", function() {
  equal( datatable.getPosition().top, 123, 'ok' );
  equal( datatable.getPosition().left, 160, 'ok' );
});

test("can determine the width and height of the table", function() {
  equal( datatable.getDimensions().width > 0, true, 'ok' );
  equal( datatable.getDimensions().height > 0, true, 'ok' );
});




}())