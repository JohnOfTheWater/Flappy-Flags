(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#score').hide();
    $('#slideshow > div:gt(0)').hide();
    $('#displayFlags').on('click', '.flag', setFlag);
    $('#displayCountries').on('click', '.country', setCountry);
    $('#match').click(sendMatch);
    countDown();
  }

  var flag = '';
  var country = '';
  var counter = 0;
  var i = 1160;
  var timer = setInterval(countDown, 1000);
  var attempts = 0;

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
    attempts += 1;
    if(data.answer === 'yes'){
      $('.flag[val="'+flag+'"]').addClass('thumbUp').removeClass('flag').removeClass('selected');
      $('.country[val="'+country+'"]').addClass('thumbUp').removeClass('country').removeClass('selected').text('');
      counter += 1;
      if(counter === 7 ){
        //$('body').empty();
        alert('YOU WON!!!');
        $('#score').fadeIn();
        $('#attempts').text('Attempts: '+attempts);
        $('#timeleft').text('Time Left: '+i);
        $('#finalScore').text('Final Score:'+i*attempts);
        $('#timer').remove();
      }
    }else{
      i -= 9;
      $('.flag[val="'+flag+'"]').removeClass('selected');
      $('.country[val="'+country+'"]').removeClass('selected');
    }
  }

  function countDown(){
    if (i <= 0){
      clearInterval(timer);
      alert('Time is up!');
      $('body').empty();
    }else{
      i--;
      $('#timer').text(i);
    }
  }

  setInterval(function() {
    $('#slideshow > div:first')
      .fadeOut(1700)
      .next()
      .fadeIn(1700)
      .end()
      .appendTo('#slideshow');
  },  1700);

})();

