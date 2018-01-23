  /**************************************************************/
  // setup
  /**************************************************************/

    var animations    = ['animation1', 'animation2', 'animation3', 'animation4'],
        circles       = document.querySelectorAll('.floating-circle');
        innerCircles  = document.querySelectorAll('.floating-circle .inner');
        canvas        = document.getElementById('canvas'),
        canvas2D      = canvas.getContext("2d")
  
    function init_vars(){
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      circleWidth  = circles[0].innerWidth;
    }

    init_vars();


  /**************************************************************/
  // functions
  /**************************************************************/

    function circles_init_position(){

      circles.forEach(function(element){

        var _this = element

        var x       = parseFloat(_this.getAttribute('data-init-x'));
        var y       = parseFloat(_this.getAttribute('data-init-y'));
        var delta   = circleWidth/2;

        _this.style.top = y + 'vh';
        _this.style.left = x + 'vw';

      });  
    }

    function canvas_init(){
      canvas.width = viewportWidth;
      canvas.height = viewportHeight; 
    }


    function connect(selectorStart, selectorEnd){

      var start     = document.querySelectorAll(selectorStart)[0];
      var end       = document.querySelectorAll(selectorEnd)[0];
      var diamStart = start.offsetWidth
      var diamEnd   = end.offsetWidth
      var startOffset = start.getBoundingClientRect();
      var xStart = startOffset.left + diamStart/2;
      var yStart = startOffset.top + diamStart/2;
      var endOffset = end.getBoundingClientRect();
      var xEnd = endOffset.left + diamEnd/2;
      var yEnd = endOffset.top + diamEnd/2;


      // ---------------------------------------------------------
      //  If distance from circle needed 
      //  https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point
      // ---------------------------------------------------------
        
        // First Point
          var dt = diamStart/2 + 10; //new distance
          var d  = Math.sqrt( (xEnd - xStart) * (xEnd - xStart) + (yEnd - yStart) * (yEnd - yStart) ); //distance btw. original points
          var t  = dt/d; //ratio

          xt = ( ( ( 1 - t ) * xStart + t * xEnd ) )
          yt = ( ( ( 1 - t ) * yStart + t * yEnd ) )

        // second point
          var dtt = diamEnd/2 + 10; //new distance
          var tt  = dtt/d; //ratio

          xtt = ( ( ( 1 - tt ) * xEnd + tt * xStart ) )
          ytt = ( ( ( 1 - tt ) * yEnd + tt * yStart ) )

        canvas2D.strokeStyle = "rgba(120, 244, 91, 0.3)";
        canvas2D.lineWidth = 2;
        canvas2D.beginPath();
        canvas2D.moveTo(xt,yt);
        canvas2D.lineTo(xtt,ytt);
        canvas2D.stroke();
    }

    window.requestAnimFrame = (function(callback) {
      return  window.requestAnimationFrame || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame || 
              window.oRequestAnimationFrame || 
              window.msRequestAnimationFrame ||
              function(callback) {
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    function draw_connections(){

      // clear canvas
      canvas2D.clearRect(0, 0, canvas.width, canvas.height);

      //draw
      innerCircles.forEach(function(el){
        
        var _this     = el;
        var thisId    = '#' + _this.getAttribute('id');
        var goTo      = _this.getAttribute('data-connect-to');
        var _diameter = _this.offsetWidth;

        if (goTo) {
          var goTo = goTo.split(',');
          var goToLength = goTo.length;

          for (var i = 0; i < goToLength; i++) {
            connect( thisId , goTo[i], _diameter);
          }  
        }
      })

      //repeat
      requestAnimFrame(function() {
        draw_connections();
      });
    }

    function animate(){

      var animationsNumber = animations.length - 1;
      var z = 0;

      circles.forEach(function(el){

        if(z > animationsNumber){
          z = 0;
        } 
        el.classList.add(animations[z]);  
        z++;
      })
    }

  /**************************************************************/
  // fire functions
  /**************************************************************/

      canvas_init();
      draw_connections();
      animate();

      setTimeout(function() {
        circles_init_position();  
      }, 500);