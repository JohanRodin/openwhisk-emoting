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
  const rating = $(event.target);
  const value = rating.attr('data-value');
  const shake = rating.attr('data-shake');
  //const comment = rating.attr('myRateComment');
  var comment = $('#myRateComment').val();     
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
}

function handleSubmitting(event) {
  const submit = $(event.target);
  const value = submit.attr('data-value');
  const shake = submit.attr('data-shake');
  //const comment = submit.attr('myRateComment');
  var comment = $('#myRateComment').val();  
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
  $('#myRateComment').val(""); 
}
function myFunction(mycomment, rating) {
  emoting.rate(currentQuestion.id, rating, mycomment).done(function(result) {
    console.log('[OK] Rated!', result);
  }).error(function(error) {
    console.log('[KO]', error);
  });

}
