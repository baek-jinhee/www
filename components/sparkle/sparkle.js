let colour = "oklch(0.9353 0.1011 315.53)";
const sparkles = 120;

/****************************
 *  Tinkerbell Magic Sparkle *
 * (c) 2005 mf2fm web-design *
 *  http://www.mf2fm.com/rv  *
 * DON'T EDIT BELOW THIS BOX *
 ****************************/
let ox = 400;
let x = ox;
let oy = 300;
let y = oy;
let shigh = 600;
let sdown = 0;
const tiny = [];
const star = [];
const starv = [];
const starx = [];
const stary = [];
const tinyx = [];
const tinyy = [];
const tinyv = [];

let isHome = false;

window.addEventListener("load", function () {
  if (document.querySelector(".hero")) {
    colour = "white";
    isHome = true;
  }
  const tinySize = isHome ? 5 : 3;
  const starSize = isHome ? 8 : 5;
  const barW = isHome ? 2 : 1;
  const barOff = isHome ? 3 : 2;
  if (document.getElementById) {
    for (let i = 0; i < sparkles; i++) {
      const tinyParticle = createDiv(tinySize, tinySize);
      tinyParticle.style.visibility = "hidden";
      tinyParticle.style.pointerEvents = "none";
      tiny[i] = tinyParticle;
      document.body.appendChild(tinyParticle);
      starv[i] = 0;
      tinyv[i] = 0;
      const starParticle = createDiv(starSize, starSize);
      starParticle.style.backgroundColor = "transparent";
      starParticle.style.visibility = "hidden";
      starParticle.style.pointerEvents = "none";
      const leftBar = createDiv(barW, starSize);
      const downBar = createDiv(starSize, barW);
      starParticle.appendChild(leftBar);
      starParticle.appendChild(downBar);
      leftBar.style.top = barOff + "px";
      leftBar.style.left = "0px";
      downBar.style.top = "0px";
      downBar.style.left = barOff + "px";
      star[i] = starParticle;
      document.body.appendChild(starParticle);
    }
    set_width();
    sparkle();
  }
});

function sparkle() {
  if (x != ox || y != oy) {
    ox = x;
    oy = y;
    for (let c = 0; c < sparkles; c++) {
      if (!starv[c]) {
        starx[c] = x;
        stary[c] = y;
        star[c].style.left = x + "px";
        star[c].style.top = y + "px";
        const ss = isHome ? 8 : 5;
        star[c].style.clip = "rect(0px, " + ss + "px, " + ss + "px, 0px)";
        star[c].style.visibility = "visible";
        starv[c] = 50;
        break;
      }
    }
  }
  for (let c = 0; c < sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }
  setTimeout(sparkle, 40);
}

function update_star(i) {
  if (--starv[i] == 25) {
    if (isHome) {
      star[i].style.clip = "rect(2px, 6px, 6px, 2px)";
    } else {
      star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    }
  }
  if (starv[i]) {
    stary[i] += 1 + Math.random() * 3;
    if (stary[i] < shigh + sdown) {
      star[i].style.top = stary[i] + "px";
      starx[i] += ((i % 5) - 2) / 5;
      star[i].style.left = starx[i] + "px";
    } else {
      star[i].style.visibility = "hidden";
      starv[i] = 0;
      return;
    }
  } else {
    tinyv[i] = 50;
    tinyy[i] = stary[i];
    tinyx[i] = starx[i];
    tiny[i].style.top = tinyy[i] + "px";
    tiny[i].style.left = tinyx[i] + "px";
    tiny[i].style.width = (isHome ? 3 : 2) + "px";
    tiny[i].style.height = (isHome ? 3 : 2) + "px";
    star[i].style.visibility = "hidden";
    tiny[i].style.visibility = "visible";
  }
}

function update_tiny(i) {
  if (--tinyv[i] == 25) {
    tiny[i].style.width = (isHome ? 2 : 1) + "px";
    tiny[i].style.height = (isHome ? 2 : 1) + "px";
  }
  if (tinyv[i]) {
    tinyy[i] += 1 + Math.random() * 3;
    if (tinyy[i] < shigh + sdown) {
      tiny[i].style.top = tinyy[i] + "px";
      tinyx[i] += ((i % 5) - 2) / 5;
      tiny[i].style.left = tinyx[i] + "px";
    } else {
      tiny[i].style.visibility = "hidden";
      tinyv[i] = 0;
      return;
    }
  } else {
    tiny[i].style.visibility = "hidden";
  }
}

function mouse(e) {
  set_scroll();
  y = e.pageY;
  x = e.pageX;
}
document.addEventListener("mousemove", mouse);

function set_scroll() {
  if (typeof self.pageYOffset == "number") {
    sdown = self.pageYOffset;
  } else if (document.body.scrollTop) {
    sdown = document.body.scrollTop;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    sdown = document.documentElement.scrollTop;
  } else {
    sdown = 0;
  }
}

window.addEventListener("resize", set_width);
function set_width() {
  if (typeof self.innerHeight == "number") {
    shigh = self.innerHeight;
  } else if (
    document.documentElement &&
    document.documentElement.clientHeight
  ) {
    shigh = document.documentElement.clientHeight;
  } else if (document.body.clientHeight) {
    shigh = document.body.clientHeight;
  }
}

function createDiv(height, width) {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = height + "px";
  div.style.width = width + "px";
  div.style.overflow = "hidden";
  div.style.backgroundColor = colour;
  div.style.pointerEvents = "none";
  div.style.zIndex = "9999";
  return div;
}
