var btn = $('<button>');
btn.html('Roll Call');

$('.button').append(btn);

btn.click(() => {
  rollCall();
});

function rollCall() {
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/roll_call',
    success: (data) => {
      console.log(data);
      var ul = $('<ul>');
      data.forEach((item) => {
        var li = $('<li>');
        ul.append(li);
        li.html(item);
      });
      $('.console').append(ul);
    }
  });
}
