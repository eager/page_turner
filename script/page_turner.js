(function(){
  
  if(window.page_turner)
    return;
    
  page_turner = window.page_turner = function(id) {
    
    var _id = id ? id : "#page_turner";
    var _inner_id_string = "inner";
    var _id_inner = _id + " #" + _inner_id_string;
    
    var that = this;
        
    this.set_image_height = function(height) {
      
      this._image_height = height;
      $(_id).height(height);
    };
    
    this.set_image_width = function(width) {
      
      this._image_width = width;
      $(_id).width(width);
    };
    
    this.add_images = function(image_array) {
      
      var margin = 2;
      var image_width = that.get_image_width();
      
      if($(_id_inner).length === 0) {
        $("<div/>")
          .attr("id", _inner_id_string)
          .appendTo(_id).draggable({
            axis: 'x',
            start: function(event, ui) {
              inner.stop();
            },
            stop: function(event, ui) {
              var left = ui.position.left;
              var weight = 0.48;
              var a = Math.abs(left / image_width);
              weight = a > Math.round(a) ? weight : weight * -1;
              var b = Math.round(a + weight);

              var target_left = b * image_width * -1;

              inner.animate({
                left: target_left
              }, 1000);
            }
          });
      }
      
      var inner = $(_id_inner);
                  
      that._images = that._images ? that._images + image_array : image_array;
      
      $.each(image_array, function() {
        
        var image_name = this.split('/').pop().split('.').slice(0, -1).join('.');
                
        $("<img/>")
          .attr("id", image_name)
          .attr("src", this)
          .attr("height", that.get_image_height())
          .attr("width", that.get_image_width())
          .appendTo(_id_inner);
        
      });
      
      var number_of_images = inner.children().length;
      
      var offset = inner.offset();
      var max_x = offset.left;
      var min_x = offset.left - (number_of_images - 1) * image_width;
      
      inner.draggable('option', 'containment', [min_x, 0, max_x, 0]);
      
      
      inner.width(number_of_images * image_width);
      
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