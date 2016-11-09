// (echo -n "javascript:"; uglifyjs docs/random-form-filler.js -m) >  docs/random-form-filler.ugly.js; cat docs/random-form-filler.ugly.js | pbcopy
(function(options) {
options = options || {};

function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
function nTimes(count, fn, join) {
  var out = [];
  for (var i = 0; i < count; i++) {
    out.push(fn());
  }
  return out.join(join);
}
function randomLetter() {
  return "abcdefghijklmnopqrstuvwxyz".substr(Math.floor(Math.random() * 26), 1)
}
function randomNumber() {
  return "0123456789".substr(Math.floor(Math.random() * 10), 1)
}
function randomWord(count) {
  count = count || rand(3, 10);
  var word = nTimes(count, randomLetter, "");
  return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
}
function randomSentence(count) {
  count = count || rand(3, 10);
  var sentence = nTimes(count, randomWord, " ") + ".";
  return sentence.substr(0, 1).toUpperCase() + sentence.substr(1).toLowerCase();
}
function randomParagraph(count) {
  count = count || rand(2, 4);
  return nTimes(count, randomSentence, " ")
}
function randomText(count) {
  count = count || rand(1, 3);
  return nTimes(count, randomParagraph, "\n\n");
}
var $form = $(document.activeElement).closest('form');
if ($form.length == 0) {
  $form = $("form.app-page");
}
$form.find('input, select, textarea').each(function(){
  var $el = $(this), name;
  if (this.nodeName == "SELECT") {
    $el.find('option').attr('select', false).eq(Math.floor(Math.random() * $el.find('option').length)).attr('selected', true)
  } else if (this.nodeName == "TEXTAREA") {
    $el.val(randomText());
  } else if (this.nodeName == "INPUT" && this.type == 'checkbox') {
    this.checked = Math.random() >= 0.5;
  } else if (this.nodeName == "INPUT" && this.type == 'radio') {
    this.checked = Math.random() >= 0.5;
  } else if (name = $el.prop("name")) {
    if (name.match(/email/)) {
      $el.val(randomWord() + "." + randomWord() + "@" + randomWord() + "." + randomWord(rand(2, 8)));
    } else if (name.match(/zipcode/)) {
      $el.val(randomWord(rand(5,8)).toUpperCase());
    } else if (name.match(/phone/)) {
      $el.val("+" + nTimes(rand(9, 13), randomNumber, ""));
    } else if (name.match(/currency|amount/)) {
      $el.val(nTimes(rand(1, 6), randomNumber, ""));
    } else if (name.match(/year/)) {
      $el.val(rand(1900, 2020));
    } else if (name.match(/month/)) {
      $el.val(rand(1, 12));
    } else if (name.match(/day/)) {
      $el.val(rand(1, 31));
    } else if (name.match(/website/)) {
      $el.val("http://example.com/" + rand(1, 100000));
    } else {
      $el.val(randomWord());
    }
  }
})
if (options.submit) {
  $form.find("button.button.fr").trigger('click');
}

})();
