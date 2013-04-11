module("page_turner", {
    setup: function() {
        myId = "#myId";
        pt = new page_turner(myId);
        node = $(myId);
        
        height = 150;
        width = 200;
    },
    teardown: function() {
        delete pt;
    }
});

var setup_page_turner = function(a_page_turner, height, width) {
    
    a_page_turner.set_image_height(height);
    a_page_turner.set_image_width(width);
};

test("constructor", function(){
    expect(4);
    
    equals(node.css("margin"), "0px auto", "Margin should be '0 auto'");
    equals(node.css("overflow"), "hidden", "overflow should be 'hidden'");
    // the following test fails on Firefox: rgb(0,0,0)
    equals(node.css("background-color"), "black", "background should be 'black'");
    equals(node.css("border"), "2px solid black", "border should be '2px solid black'");
});

test("set width and height", function() {
    expect(4);
    
    setup_page_turner(pt, height, width);
    
    equals(node.height(), 150, "Height of HTML node should be equal");
    equals(node.width(), 200, "Width of HTML node should be equal");
    equals(pt.get_image_height(), 150, "Height of getter should be equal");
    equals(pt.get_image_width(), 200, "Width of getter should be equal");
});

test("add images", function() {
    
    expect(6);
    
    setup_page_turner(pt, height, width);
    
    pt.add_images([
        "image_1.jpg",
        "image_2.jpg"
    ]);
    
    var inner_node = $(myId + " #inner");
    
    equals(pt._images.length, 2, "internal image array should have 2 items");
    equals(inner_node.children().length, 2, "inner node should have 2 children");
    equals(inner_node.css("width"), width * 2 + "px", "inner node’s width should be 2× image width");
    
    pt.add_images([
        "image_3.jpg",
        "image_4.jpg",
        "image_5.jpg"
    ]);

    equals(pt._images.length, 5, "internal image array should have 5 items");
    equals(inner_node.children().length, 5, "inner node should now have 5 children");
    equals(inner_node.css("width"), width * 5 + "px", "inner node's with should be 2× image width");
    
});

