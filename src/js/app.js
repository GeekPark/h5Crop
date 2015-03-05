$(function() {
  $('#h5img').change(function() {
    // display resize

    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = resizeUpload;
      reader.readAsDataURL(this.files[0]);
    }

  });

  function resizeUpload (e) {
    e.stopPropagation();
    e.preventDefault();

    var imgdata = e.target.result,
        $loaded = $('#h5img-loaded');

    var canvas = document.createElement('canvas'),
        imageDOM = document.getElementById('h5img-loaded');

    $loaded.attr('src', imgdata);

    $loaded.load(function() {
      var imgH = $(this).height(),
          imgW = $(this).width();

      displayCanvas({
        width: 100,
        height: 100
      });

    });

    $loaded.Jcrop({
      aspectRatio: 1,
      setSelect: [ 100, 100, 50, 50 ],
      onSelect: imgSelect,
      onChange: imgSelect
    });


    function displayCanvas (option) {
      canvas.width = option.width;
      canvas.height = option.height;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(imageDOM, 0, 0, canvas.width, canvas.height);
    }

    function imgSelect(selection) {
      canvas.width = canvas.height = 100;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(
        imageDOM, selection.x, selection.y, selection.w, selection.h,
        0, 0, canvas.width, canvas.height
      );
      $('#h5img-output').attr('src', canvas.toDataURL());
    }
  }
});
