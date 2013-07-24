var expect = chai.expect,
    should = chai.should();




describe('Sport ticker item', function() {
    var tickerjson = {
          headline: 'headline text',
          prompt: 'PROMPT'
        };
 
    it('should display the headline text', function() {
      expect(TickerItemPresentation(tickerjson).html()).to.contain('headline text');
    });
    
    describe('Prompt', function() {
      it('should have the relevant prompt text', function() {
        var prompt = $('.prompt',TickerItemPresentation(tickerjson));
      
        expect(prompt.text()).to.have.string('PROMPT');
      });
    });
    
})