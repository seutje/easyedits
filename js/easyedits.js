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
  },
  activate: function() {
    // @todo: Clean up.
    var $output = $(this),
        $form = $output.next('.easyedits-form'),
        $wrap = $output.parent();
    $output.toggleClass('element-invisible');
    // @todo: find a reliable way to trigger focus
    $form.toggleClass('element-invisible');
    // Add 'active' identifier
    // @todo: this will explode with multiple on the same page
    $wrap[0].id = 'easyedits-active-wrapper';
  }
};

})(jQuery);