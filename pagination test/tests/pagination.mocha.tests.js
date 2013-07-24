var expect = chai.expect,
    should = chai.should();




describe('Pagination control', function() {
    var paginationObject,
        html,
        json = {
          entries: [
            {a:'a'},{b:'b'},{c:'c'}
          ]
        };
    
    beforeEach(function(){
      html = $('<div class="pagination-container"></div>').get(0);   
      paginationObject = new Pagination(html, json);
    });
    
    afterEach(function(){
      paginationObject = {};
      html = null;
    });
    
    it('should be a pagination control', function() {
      paginationObject.toString().should.equal('[Object Pagination]');
    });
    
    describe('Numbered links', function() {
      it('should have a numbered link per entry', function() {
        $('li.numbered-link', html).length.should.equal(3);
      }); 
      
      it('should have each link numbered from 1 to the amount of entries', function() {
        var firstNumberedLink = $('li.numbered-link:eq(0)', html),
            thirdNumberedLink = $('li.numbered-link:eq(2)', html);
            
        firstNumberedLink.text().should.equal('1');
        thirdNumberedLink.text().should.equal('3');
      }); 
      
      it('should have no more than seven numbered links (in time constraint have not considered ellipsis - sorry)', function() {
        html = $('<div class="pagination-container"></div>').get(0);   
        paginationObject = new Pagination(html, {
          entries: [
              {},{},{},{},{},{},{},{},{}
            ]
        });
        
        $('li.numbered-link', html).length.should.equal(7);
      });
      
      it('should indicate currently selected item cannot be clicked', function() {
        $('li.numbered-link:eq(0)', html).get(0).className.should.contain('inactive');
      }); 
      
      it('should highlight selected link when clicked', function() {
        $('li.numbered-link:eq(2)', html).trigger('click');
        $('li.numbered-link:eq(0)', html).get(0).className.should.not.contain('inactive');
        $('li.numbered-link:eq(0)', html).get(0).className.should.contain('active');
        $('li.numbered-link:eq(2)', html).get(0).className.should.contain('inactive');
      }); 
      
      it('should provide first entry for display when ready', function(done) {
        html = $('<div class="pagination-container"></div>').get(0);   
        
        paginationObject = new Pagination(html, json, function(entryjson){
          entryjson.a.should.equal('a');
          done();
        });
      }); 
      
      it('should provide entry for display when clicked on', function(done) {
        var jsonfromcallback = {};
        
        html = $('<div class="pagination-container"></div>').get(0);   
        
        paginationObject = new Pagination(html, json, function(entryjson){
          jsonfromcallback = entryjson;
        });
        
        $('li.numbered-link:eq(1)', html).trigger('click');
        
        jsonfromcallback.b.should.equal('b');
        done();
      });
      
    });
    
    describe('Previous link', function() {
      it('should be present', function() {
        expect($('li.previous-link', html).length).to.not.be.empty;
      });
      
      it('should be inactive when first item is selected', function() {
        expect($('li.previous-link', html).get(0).className).to.contain('inactive');
      });   
      
      it('should select the previous numbered link when clicked', function() {
        $('li.numbered-link:eq(2)', html).trigger('click');
        $('li.previous-link', html).trigger('click');
        
        expect($('li.numbered-link:eq(2)', html).get(0).className).not.to.contain('inactive');
        expect($('li.numbered-link:eq(1)', html).get(0).className).to.contain('inactive');
      });
      
      it('should be active when any item except the first one is selected', function() {
        $('li.numbered-link:eq(2)', html).trigger('click');
      
        expect($('li.previous-link', html).get(0).className).not.to.contain('inactive');
        expect($('li.previous-link', html).get(0).className).to.contain('active');
      });
    });
    
    describe('Next link', function() {
      it('should be present', function() {
        expect($('li.next-link', html).length).to.not.be.empty;
      });
      
      it('should be inactive when last item is selected', function() {
        $('li.numbered-link:eq(2)', html).trigger('click');
        
        expect($('li.next-link', html).get(0).className).to.contain('inactive');
      });
      
      it('should select the next numbered link when clicked', function() {
        $('li.next-link', html).trigger('click');
        
        expect($('li.numbered-link:eq(0)', html).get(0).className).not.to.contain('inactive');
        expect($('li.numbered-link:eq(1)', html).get(0).className).to.contain('inactive');
      });
      
      it('should be active when any item except the last one is selected', function() {
        expect($('li.next-link', html).get(0).className).not.to.contain('inactive');
        expect($('li.next-link', html).get(0).className).to.contain('active');
      });
    });

    
    
})