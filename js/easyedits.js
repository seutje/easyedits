(function($){

Drupal.behaviors.easyedits = {
  attach: function(context) {
    $('.easyedits-wrapper', context)
    .not('.easyedits-processed')
    .addClass('easyedits-processed')
    .each(this.exec);
  },
  exec: function() {
    // @todo: Click sucks, consider making it focusable.
    $('.easyedits-output', this).bind('click', Drupal.behaviors.easyedits.activate);
    var $form = $('.easyedits-form', this).find('form'); 
    $form.bind('submit', Drupal.behaviors.easyedits.submit);
  },
  activate: function() {
    // @todo: Clean up.
    var $output = $(this),
        $form = $output.next('.easyedits-form');
    $output.toggleClass('element-invisible');
    // @todo: find a reliable way to trigger focus
    $form.toggleClass('element-invisible');
  },
  submit: function(e) {
    e.preventDefault();
    var $form = $(this);
    $.ajax({
      url: Drupal.settings.basePath + 'easyedits/ajax',
      data: $form.serialize(),
      type: 'POST',
      success: Drupal.behaviors.easyedits.success
      
    });
  },
  success: function(data, textStatus, jqXHR) {
    var safe, unsafe;
    for (var i in data) {
      for (var j = 0; j < data[i].length; j++) {
        console.log(data[i][j]);
      }
    }
    console.log(data);
  }
};

})(jQuery);