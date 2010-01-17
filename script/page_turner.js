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
    
    this.set_images = function(image_array) {
      
      var margin = 2;
      
      $("<div/>")
        .attr("id", _inner_id_string)
        .appendTo(_id);
      
      $(_id_inner)
        .css({
          
        });
      
      var offset = $(_id_inner).offset();
      var max_x = offset.left;
      var min_x = offset.left - (image_array.length - 1) * that.get_image_width();
      
      $(_id_inner).draggable({
        axis: 'x',
        containment: [min_x, 0, max_x, 0],
        stop: function(event, ui) {
          var left = ui.position.left;
          
          var target_left = Math.round(left / that.get_image_width()) * that.get_image_width();

          $('#' + event.target.id).animate({
            left: target_left
          }, 1000);
        }
      });
      
      $(_id_inner).width(image_array.length * that.get_image_width());
      
      that._images = image_array;
      
      $.each(that._images, function() {
        
        var image_name = this.split('/').pop().split('.').slice(0, -1).join('.');
                
        $("<img/>")
          .attr("id", image_name)
          .attr("src", this)
          .attr("height", that.get_image_height())
          .attr("width", that.get_image_width())
          .appendTo(_id_inner);
        
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