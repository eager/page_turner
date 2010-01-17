(function(){
  
  if(window.page_turner)
    return;
    
  page_turner = window.page_turner = function(id) {
    
    var _id = id ? id : "#page_turner";
    var _id_inner = "inner";
    var _inner_selector = _id + " #" + _id_inner;
    
    var that = this;
    
    this._append_image_tag = function(image_path, node) {
      var image_name = image_path.split('/').pop().split('.').slice(0, -1).join('.');
      
      var image_tag =  '<img id="' + image_name + '" src="' + image_path + '" height="' + this.get_image_height() + '" width="' + this.get_image_width() + '" />';
      
      node.append(image_tag);
    };
    
    this.set_image_height = function(height) {
      this._image_height = height;
      
      $(_id).height(height);
    };
    
    this.set_image_width = function(width) {
      this._image_width = width;
      
      $(_id).width(width);
    };
    
    this.set_images = function(image_array) {
      $(_id).append('<div id="' + _id_inner + '"></div>');
      
      var offset = $(_inner_selector).offset();
      var max_x = offset.left;
      var min_x = offset.left - (image_array.length - 1) * that.get_image_width();
      
      $(_inner_selector).draggable({
        axis: 'x',
        containment: [min_x, 0, max_x, 0]
      });
      
      $(_inner_selector).width(image_array.length * that.get_image_width());
      
      that._images = image_array;
      
      $.each(that._images, function() {
        that._append_image_tag(this, $(_inner_selector));
      });
      
      
    };
    
    this.get_image_height = function() {
      return this._image_height;
    };
    
    this.get_image_width = function() {
      return this._image_width;
    };
    
    $(_id).css({
      "margin": "0 auto",
      "overflow": "hidden",
      "background-color": "black",
      "border": "2px solid black"
    });
          
  };
  
})();