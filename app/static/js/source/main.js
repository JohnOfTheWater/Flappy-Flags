(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#displayFlags').on('click', '.flag', setFlag);
    $('#displayCountries').on('click', '.country', setCountry);
    $('#match').click(sendMatch);
    countDown();
  }

  var flag = '';
  var country = '';
  var counter = 0;
  var i = 60;
  var timer = setInterval(countDown, 1000);

  function setFlag(){
    debugger;
    $(this).addClass('selected');
    flag = $(this).attr('val');
  }

  function setCountry(){
    debugger;
    $(this).addClass('selected');
    country = $(this).attr('val');
  }

  function sendMatch(){
    var url = '/match?flag='+flag+'&country='+country;
    $.getJSON(url, displayResult);
  }

  function displayResult(data){
    if(data.answer === 'yes'){
      $('.flag[val="'+flag+'"]').addClass('thumbUp').removeClass('flag').removeClass('selected');
      $('.country[val="'+country+'"]').addClass('thumbUp').removeClass('country').removeClass('selected').text('');
      counter += 1;
      if(counter === 5 ){
        $('body').empty();
        alert('YOU WON!!!');
      }
    }else{
      $('.flag[val="'+flag+'"]').removeClass('selected');
      $('.country[val="'+country+'"]').removeClass('selected');
    }
  }

  function countDown(){
    if (i === 0){
      clearInterval(timer);
      alert('Time is up!');
      $('body').empty();
    }else{
      i--;
      $('#timer').text(i);
    }
  }

})();

