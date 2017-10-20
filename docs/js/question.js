const questionTemplate = Handlebars.compile($('#question-template').html());

var currentQuestion;

function showQuestion(questionId) {
  console.log('Retrieving question with id', questionId);
  emoting.read(questionId).done(function(question) {
    console.log('[OK]', question);
    currentQuestion = question;

    const context = {};
    context.ratingChoices = ratingChoices;
    context.question = question;

    $('#empty-layout-body').html(questionTemplate(context));
    $('.rating').on('click', handleRating);
    $('.submitting').on('click', handleSubmitting);

    $('#section-loading').fadeOut().hide();
    $('#empty-layout').fadeIn().css('display', 'flex');
    $('#polite').hide();
  }).fail(function(error) {
    console.log('[KO]', error);
  });
}

function handleRating(event) {
  var rating = $(event.target);
  var value = rating.attr('data-value');
  var shake = rating.attr('data-shake');
  //const comment = rating.attr('myRateComment');
  var comment = 'no comment';  
  //based on value (verygood, good, etc) get the right textarea and assign comment
  switch (value) {
  case 'verygood': comment = $('#myRateComment1').val()  || 'no comment';  break;
  case 'good': comment = $('#myRateComment2').val()  || 'no comment';  break;
  case 'bad': comment = $('#myRateComment3').val()  || 'no comment';  break;
  case 'verybad': comment = $('#myRateComment4').val()  || 'no comment'; break;
    default: 
  };
  //naive solution
  //var comment = $('#myRateComment').val()  || 'no comment'; 
  console.log('tap on', value);

  rating.addClass(`shake-constant ${shake}`);

  emoting.rate(currentQuestion.id, value, comment).done(function(result) {
    console.log('[OK] Rated!', result);
  }).error(function(error) {
    console.log('[KO]', error);
  });

  // animate no matter what
  setTimeout(function() {
    rating.removeClass(`shake-constant ${shake}`);
  }, 500);
  $('#polite').show();
  $('#myRateComment1').val(""); 
  $('#myRateComment2').val(""); 
  $('#myRateComment3').val(""); 
  $('#myRateComment4').val(""); 
}

function handleSubmitting(event) {
  var submit = $(event.target);
  var value = submit.attr('data-value');
  var shake = submit.attr('data-shake');
  //const comment = submit.attr('myRateComment');
  var comment = 'no comment';  
  //based on value () get the right textarea and assign comment
  switch (value) {
  case 'verygood': comment = $('#myRateComment1').val()  || 'no comment';  break;
  case 'good': comment = $('#myRateComment2').val()  || 'no comment';  break;
  case 'bad': comment = $('#myRateComment3').val()  || 'no comment';  break;
  case 'verybad': comment = $('#myRateComment4').val()  || 'no comment'; break;
    default: 
  };
  //naive solution
  //var comment = $('#myRateComment').val()  || 'no comment';   
  console.log('tap on', value);

  submit.addClass(`shake-constant ${shake}`);

  emoting.rate(currentQuestion.id, value, comment).done(function(result) {
    console.log('[OK] Rated!', result);
  }).error(function(error) {
    console.log('[KO]', error);
  });

  // animate no matter what
  setTimeout(function() {
    submit.removeClass(`shake-constant ${shake}`);
  }, 500);
  $('#polite').show();
  $('#myRateComment1').val(""); 
  $('#myRateComment2').val(""); 
  $('#myRateComment3').val(""); 
  $('#myRateComment4').val(""); 
}
function myFunction(mycomment, rating) {
  emoting.rate(currentQuestion.id, rating, mycomment).done(function(result) {
    console.log('[OK] Rated!', result);
  }).error(function(error) {
    console.log('[KO]', error);
  });

}
