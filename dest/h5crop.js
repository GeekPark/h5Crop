/*
*
* h5crop.js
*
* Using canvas to crop image , No need server side .
* Require:
* 1. Browser need support canvas
* 2. Installed jQuery & Jcrop.js
*
* Browser Support:
* IE 10+  Firefox 3.6+  Chrome 7+   Safari 6+
*
* Author: Vanilla
* Email:  mail@liyaodong.com
* Github: http://github.com/liyaodong
* Site:   liyaodong.com
*
*/

(function($) {
  $.fn.h5Crop = function(opt) {
    var $this = this;

    var previewID = 'h5crop-preview'
        outputID  = 'h5crop-output';

    opt.previewClass = opt.previewClass || 'h5crop-preview';
    opt.previewW = opt.previewW || 500;
    opt.cropW = opt.cropW || 100;
    opt.cropH = opt.cropH || 100;
    opt.aspectRatio = opt.cropW/opt.cropH;

    // Listener file upload event
    $this.change(function() {
      // load image
      if(this.files[0]) {
        var reader = new FileReader();
        // using preview fun to deal this
        reader.onloadend = preview;
        reader.readAsDataURL(this.files[0]);
      }
    });


    function preview (e) {
      e.stopPropagation();
      e.preventDefault();

      var imageData = e.target.result,
          $preview  = $('#'+ previewID),
          canvas = document.createElement('canvas');

      // Adjust canvas size
      canvas.width = opt.cropW;
      canvas.height = opt.cropH;

      // If don't have $preview then create it
      if($preview.length === 0) {
        $preview  = $(document.createElement('img'));
        $preview.attr('id', previewID);
        $this.after($preview);
      }


      $preview.addClass(opt.previewClass)
              .attr('src', imageData)
              // clear height & width set
              .attr('style', '');

      $preview.load(function() {
        // Be careful $this , above used .
        var $$this = $(this),
            realW = $$this.width(),
            realH = $$this.height(),
            adjustH = (opt.previewW * realH)/ realW;

        $$this.width(opt.previewW);
        $$this.height(adjustH);
      });

      // Created $preview & hidden canvas , then display control UI

      $preview.Jcrop({
        aspectRatio: opt.aspectRatio,
        setSelect: [ 0, 0, opt.cropW, opt.cropH ],
        onSelect: imgSelect,
        onChange: imgSelect,
        minSize: [30, 30]
      });

      function imgSelect (selection) {
        var ctx = canvas.getContext('2d');
        ctx.drawImage(
          $preview.get(0), selection.x, selection.y, selection.w, selection.h,
          0, 0, opt.cropW, opt.cropH
        );

        var $output;

        if($('#'+ outputID).length === 0) {
          $output = $(document.createElement('img'));
          $preview.after($output);
        } else {
          $output = $('#' + outputID);
        }

        $output.width(opt.cropW);
        $output.height(opt.cropH);

        var finalData = canvas.toDataURL();

        $output.attr('id', outputID);
        $output.attr('src', finalData);

      }
    }  // fun preview end
  }; // $.fn.h5Crop end
})(jQuery);

