/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
// либы
var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var json;
// первый экран
var main = new UI.Window({fullscreen: true });
// текст лоадер
var textloader = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(144, 30),
  font: 'gothic-24-bold',
  text: 'Loading data...',
  textAlign: 'center'
});
// ошибка
var textfield = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(144, 30),
  font: 'gothic-24-bold',
  text: 'Loading error!',
  textAlign: 'center'
});
// старт апп
main.add(textloader);
main.show();

// генерим массив с итемами для меню
var generateItemsForMenu = function(data) {
  var items = [];
  for (var key in data) {
    var title = key;
    var subtitle = data[key]['kd'];
    items.push({
      title:title,
      subtitle:subtitle
    });
  }
  return items;
};
// запрос инфы!
ajax(
  {
    url: 'URL/kd.php',
    type: 'json'
  }, function(data, status, request) {
    json = data;
    var menu = new UI.Menu({
      fullscreen: true,
      sections: [{
        items: generateItemsForMenu(json)
      }]
    });
    // подробная инфа     
    menu.on('select', function(e) {
      var key = e.item.title;
      var stat = new UI.Card({
        fullscreen: true,
        title: key,
        subtitle: 'kd: '+json[key]['kd']+',',
        body: 'kill: '+json[key]['kill']+',\ndead: '+json[key]['dead']+',\nkillPerMins: '+json[key]['killPerMins']
      })
      stat.show();
    });
    
    menu.show();
    main.hide();
  },
  function(error, status, request) {
    main.remove(image);
    main.add(textfield);
  }
);
