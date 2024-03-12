function imageZoom(imgID, resultID, item) {
  var img, lens, result, cx, cy, itemId;
  img = document.getElementById(imgID);
  result = jQuery(resultID)[0];
  itemId = `#` + item.id;
  var bulletPiont = jQuery(result).attr("data-target");
  var list_item = jQuery(result).attr("data-list");
  if (jQuery(result).attr("data-targetalt") == itemId) {
    bulletPiont = jQuery(result).attr("data-targetalt");
  }
  var bullet_pointDiv = jQuery(bulletPiont)[0];
  if (jQuery(result).attr("data-listalt") == itemId) {
    list_item = jQuery(result).attr("data-listalt");
  }
  var list_itemDiv = jQuery(list_item)[0];

  lens = document.createElement("DIV");
  
  lens.setAttribute("class", "img-zoom-lens");
  /* Insert lens: */
  img.parentElement.insertBefore(lens, img);
  /* Calculate the ratio between result DIV and lens: */
  cx = result.offsetWidth / (result.offsetWidth * 0.75);
  cy = result.offsetHeight / (result.offsetHeight * 0.75);
  /* Set background properties for the result DIV */
 
  function moveLens(e) {
    var pos, x, y, a;
    var hsPos = jQuery("#hs-a")[0];
    a = result.getBoundingClientRect();
    result.style.height = "50px";
    result.style.width = "50px";
    /* Prevent any other actions that may occur when moving over the image */
    // e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(a);
    // hsPos = getCursorPos(hsPos);
    console.log("hsPos :", pos);
    /* Calculate the position of the lens: */
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /* Prevent the lens from being positioned outside the image: */
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /* Display what the lens "sees": */
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    // e = result.getBoundingClientRect();
    // console.log("get cursor position function : ", a, e, e.x, e.y, img);
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.x - a.left;
    y = e.y - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

// *************************************** REVERT BULLET POINT TO SMALL SIZE FUNCTION *************************************

function makebullet_pointSmall() {
  console.log("MAKE BULLET POINT SMALL");
  jQuery(".button").css("background-color", "red");
  jQuery(".button").css("height", "10px");
  jQuery(".button").css("width", "10px");
  jQuery(".button").css("background-image", "");
  jQuery(".bullet_point").css("background-color", "red");
  jQuery("path").css("stroke", "red");
  jQuery("li").removeClass("active");
}
// })

//helper functions, it turned out chrome doesn't support Math.sgn()
function signum(x) {
  return x < 0 ? -1 : 1;
}

function absolute(x) {
  return x < 0 ? -x : x;
}

// *************************************** DRAWING THE RED SVG PATHS FUNCTION*************************************

function drawPath(svg, path, startX, startY, endX, endY) {
  // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
  var stroke = parseFloat(path.attr("stroke-width"));
  // check if the svg is big enough to draw the path, if not, set heigh/width
  if (svg.attr("height") < endY) svg.attr("height", endY);
  if (svg.attr("width") < startX + stroke) svg.attr("width", startX + stroke);
  if (svg.attr("width") < endX + stroke) svg.attr("width", endX + stroke);

  var deltaX = (endX - startX) * 0.15;
  var deltaY = (endY - startY) * 0.15;
  // for further calculations which ever is the shortest distance
  var delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

  // set sweep-flag (counter/clock-wise)
  // if start element is closer to the left edge,
  // draw the first arc counter-clockwise, and the second one clock-wise
  var arc1 = 0;
  var arc2 = 1;
  if (startX > endX) {
    arc1 = 1;
    arc2 = 0;
  }
  // draw tha pipe-like path
  // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
  path.attr(
    "d",
    "M" +
      startX +
      " " +
      startY +
      " V" +
      (startY + delta) +
      " A" +
      delta +
      " " +
      delta +
      " 0 0 " +
      arc1 +
      " " +
      (startX + delta * signum(deltaX)) +
      " " +
      (startY + 2 * delta) +
      " H" +
      (endX - delta * signum(deltaX)) +
      " A" +
      delta +
      " " +
      delta +
      " 0 0 " +
      arc2 +
      " " +
      endX +
      " " +
      (startY + 3 * delta) +
      " V" +
      endY
  );
}

// *************************************** CONNECTING THE BULLET POINTS TO LIST ITEMS HARNESSING DRAWPATH FUNCTION ABOVE *************************************

function connectElements(svg, path, startElem, endElem) {
  var svgContainer = jQuery("#svgContainer");

  // if first element is lower than the second, swap!
  if (startElem.offset().top > endElem.offset().top) {
    var temp = startElem;
    startElem = endElem;
    endElem = temp;
  }

  // get (top, left) corner coordinates of the svg container
  var svgTop = svgContainer.offset().top;
  var svgLeft = svgContainer.offset().left;

  // get (top, left) coordinates for the two elements
  var startCoord = startElem.offset();
  var endCoord = endElem.offset();

  // calculate path's start (x,y)  coords
  // we want the x coordinate to visually result in the element's mid point
  var startX = startCoord.left + 0.5 * startElem.outerWidth() - svgLeft; // x = left offset + 0.5*width - svg's left offset
  var startY = startCoord.top + startElem.outerHeight() - svgTop; // y = top offset + height - svg's top offset

  // calculate path's end (x,y) coords
  var endX = endCoord.left + 0.5 * endElem.outerWidth() - svgLeft;
  var endY = endCoord.top - svgTop;

  // call function for drawing the path
  drawPath(svg, path, startX, startY, endX, endY);
}

// *************************************** CONNECTING bullet_pointS 2 list_itemS WITH CONNECTELEMENTS FUNCTION *************************************

function connectAll() {
  connectElements(jQuery("#svg1"), jQuery("#path1"), jQuery("#hs-a"), jQuery("#bullet_point1"));
  connectElements(jQuery("#svg1"), jQuery("#path2"), jQuery("#hs-b"), jQuery("#bullet_point2"));
  connectElements(jQuery("#svg1"), jQuery("#path3"), jQuery("#hs-c"), jQuery("#bullet_point3"));
  connectElements(jQuery("#svg1"), jQuery("#path4"), jQuery("#hs-d"), jQuery("#bullet_point4"));
  connectElements(jQuery("#svg1"), jQuery("#path5"), jQuery("#hs-e"), jQuery("#bullet_point5"));
  connectElements(jQuery("#svg1"), jQuery("#path6"), jQuery("#hs-f"), jQuery("#bullet_point6"));
  connectElements(jQuery("#svg1"), jQuery("#path7"), jQuery("#hs-g"), jQuery("#bullet_point7"));
  connectElements(jQuery("#svg1"), jQuery("#path8"), jQuery("#hs-h"), jQuery("#bullet_point8"));
  connectElements(jQuery("#svg1"), jQuery("#path9"), jQuery("#hs-i"), jQuery("#bullet_point9"));
  connectElements(jQuery("#svg1"), jQuery("#path10"), jQuery("#hs-j"), jQuery("#bullet_point10"));
  connectElements(jQuery("#svg1"), jQuery("#path11"), jQuery("#hs-k"), jQuery("#bullet_point11"));
  connectElements(jQuery("#svg1"), jQuery("#path12"), jQuery("#hs-l"), jQuery("#bullet_point12"));
}

jQuery(function() {

  // reset svg each time
  jQuery("#svg1").attr("height", "0");
  jQuery("#svg1").attr("width", "0");
  connectAll();
});

jQuery(window).resize(function () {
  // reset svg each time
  jQuery("#svg1").attr("height", "0");
  jQuery("#svg1").attr("width", "0");
  connectAll();
});


// *************************************** LIST ITEM HOVER FUNCTION *************************************

/* $(function liHover() {
  $("li").hover(
    function () {
      var list_item,
        itemInfo,
        pathTarget,
        pathTargetAlt,
        target,
        targetAlt,
        bullet_point,
        path,
        pathLength;
      list_item = $(this)[0];
      itemInfo = list_item.children[0].children[0].children[0];
      bullet_point = itemInfo.id;
      pathTarget = itemInfo.attributes["data-path"].value;
      target = itemInfo.attributes["data-target"].value;
      $(".button").css("background-color", "pink");
      $(".bullet_point").css("background-color", "pink");
      $("path").css("stroke", "transparent");
      $(itemInfo).css("background-color", "red");
      $(target).css("background-color", "red");
      $(pathTarget).css("stroke", "red");
      $(list_item).addClass("active");
      console.log("target ", target, "itemInfo", itemInfo); */
     /*  $(function () {
        imageZoom("clickme", target, itemInfo);
      }); */
    /* },
    function () {
      makebullet_pointSmall();
      $(".button").css("background-color", "red");
      $(".bullet_point").css("background-color", "red");
      $("path").css("stroke", "red");
      $("li").removeClass("active");
    }
  );
}); */

// *************************************** BULLET POINT HOVER FUNCTION ************************************

/* $(function () {
  $(".bullet_point").hover(
    function () {
      var bullet_point = $(this);
      var pathTarget = $(this).attr("data-path");
      var target = $(this).attr("data-target");
      var list_item = $(this).attr("data-list");
      $(list_item).addClass("active");
      $(".button").css("background-color", "pink");
      $(".bullet_point").css("background-color", "pink");
      $("path").css("stroke", "transparent");
      $(this).css("background-color", "red");
      $(target).css("background-color", "red");

      var path = $(pathTarget)[0];
      var pathLength = path.getTotalLength();
      $(pathTarget).css("stroke-dasharray", pathLength);
      $(pathTarget).css("stroke-dashoffset", pathLength);
      $(pathTarget).css("stroke", "crimson");
      function blueOut() {
        $(pathTarget).css("stroke-dashoffset", 0);
        // console.log("blueOut for path: ", pathTarget)
      }
      setTimeout(function () {
        blueOut();
      }, 500);
      // console.log("path", path);
    },
    function () {
      $(".button").css("background-color", "red");
      $(".bullet_point").css("background-color", "red");
      // $("path").css("stroke", "red");
      $("li").removeClass("active");
      $("#svg1")
        .children("path")
        .each(function () {
          // console.log("fill color on hover for : ", this);
          var path = this;
          var pathLength = path.getTotalLength();
          $(this).css("stroke-dasharray", pathLength);
          $(this).css("stroke-dashoffset", pathLength);
          // $(this).addClass("pathActive")
          function whiteIn() {
            $(path).css("stroke", "red");
            $(path).css("stroke-dashoffset", pathLength);
            // console.log("white in for path: ", path)
          }
          setTimeout(function () {
            whiteIn();
          }, 1);
          // console.log("pathout", path, "pathLength: ", pathLength);
        });
    }
  );
}); */

// *************************************** BUTTON HOVER FUNCTION *************************************

/* $(function () {
  $(".button").hover(
    function () {
      var target = $(this).attr("data-target");
      var targetAlt = $(this).attr("data-targetAlt");
      var pathTarget = $(this).attr("data-path");
      var pathTargetAlt = $(this).attr("data-pathAlt");
      var list_item = $(this).attr("data-list");
      var list_itemAlt = $(this).attr("data-listAlt");
      $(list_item).addClass("active");
      $(".button").css("background-color", "pink");
      $(".bullet_point").css("background-color", "pink");
      $("path").css("stroke", "transparent");
      $(this).css("background-color", "red");
      $(target).css("background-color", "red");
      $(pathTarget).css("stroke", "red");
      if (list_itemAlt) {
        $(list_itemAlt).addClass("active");
        $(targetAlt).css("background-color", "red");
        $(pathTargetAlt).css("stroke", "red");
      }
    },
    function () {
      $(".button").css("background-color", "red");
      $(".bullet_point").css("background-color", "red");
      $("path").css("stroke", "red");
      $("li").removeClass("active");
    }
  );
}); */

// <script>
/* Execute the magnify function: */
// $(function(){
// imageZoom("clickme", "hs-a");

// })
/* Specify the id of the image, and the strength of the magnifier glass: */
// </script>

/* $(document).ready(function () {
  var j = 0;
  var delay = 2000; //millisecond delay between cycles
  function cycleThru() {
    console.log("cycleThru", j);
    var jmax = $("li").length - 1;
    $("li:eq(" + j + ")")
      .trigger("mouseenter", 400)
      .animate(
        {
          "border-width": "1px",
          "border-style": "solid",
          "border-color": "red !important",
          "border-radius": "10px"
        },
        400
      )
      .trigger("mouseleave", delay)
      .animate(
        {
          "border-width": "0px",
          "border-style": "solid",
          "border-color": "red !important",
          "border-radius": "10px"
        },
        5900,
        console.log(" list_item cycle: ", $("li:eq(" + j + ")")[0]),
        function () {
          j == jmax ? (j = 0) : j++;
          cycleThru();
        }
      );
  }

  cycleThru();
}); */