module("page_turner", {
    setup: function() {
        myId = "#myId";
        pt = new page_turner(myId);
        node = $(myId);
    },
    teardown: function() {
        delete pt;
    }
});



test("constructor", function(){
    expect(4);
    
    equals(node.css("margin"), "0px auto", "Margin should be '0 auto'");
    equals(node.css("overflow"), "hidden", "overflow should be 'hidden'");
    equals(node.css("background-color"), "black", "background should be 'black'");
    equals(node.css("border"), "2px solid black", "border should be '2px solid black'");
});

test("set width and height", function() {
    expect(4);
    
    var height = 150;
    var width = 200;
    
    pt.set_image_height(height);
    pt.set_image_width(width);
    
    equals(node.height(), height, "Height of HTML node should be equal");
    equals(node.width(), width, "Width of HTML node should be equal");
    equals(pt.get_image_height(), height, "Height of getter should be equal");
    equals(pt.get_image_width(), width, "Width of getter should be equal");
});