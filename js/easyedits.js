(function($){

Drupal.behaviors.easyedits = {
  attach: function(context) {
    $('.easyedits-wrapper', context)
    .not('.easyedits-processed')
    .addClass('easyedits-processed')
    .each(this.exec);
  },
  exec: function() {
    // Add unique identifier
    this.id = 'easyedits-' + new Date().getTime();
    // @todo: Click sucks, consider making it focusable.
    $('.easyedits-output', this).bind('click', Drupal.behaviors.easyedits.activate);
    $('.easyedits-form', this).find('form').bind('submit', Drupal.behaviors.easyedits.submit);
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
    // We don't use serialize() because we need to add the id
    var data = $(this).serializeArray();
    data.push({
      name: 'easyedits-id',
      value: $(this).closest('.easyedits-wrapper')[0].id
    });
    data = $.param(data);
    $.ajax({
      url: Drupal.settings.basePath + 'easyedits/ajax',
      data: data,
      type: 'POST',
      success: Drupal.behaviors.easyedits.success
    });
  },
  success: function(data, textStatus, jqXHR) {
    // Swap old field with new and run behaviors
    var $old = $('#' + data.id),
        $new = $(data.output).find('.easyedits-wrapper');
    // Use a temporary wrapper as our behavior doesn't attach to the context
    Drupal.attachBehaviors($new.wrapAll('<div />').parent());
    // Don't add the temporary wrapper
    $old.replaceWith($new);
  }
};

})(jQuery);