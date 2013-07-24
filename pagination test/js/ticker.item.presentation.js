var TickerItemPresentation = function(item){
  var html = $('<div class="news-ticker-item"></div>');
  
  html.append('<div class="prompt">' + item.prompt + '</div>');
  html.append('<div class="headline">' + item.headline + '</div>');
  
  return html;
}