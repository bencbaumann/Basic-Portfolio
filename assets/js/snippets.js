var sidepanel = {
  directive: "<social></social>",
  template: `<div id="social" class="card float-right relative">
  <h3 class="header-color-text">Connect With Me</h3>
<hr>
<ul>
    <li class="float-left margin-right-20"><a href="#"><img src='assets/images/github.svg' alt='github' height="63" width="63"/></a></li>
    <li class="float-left margin-right-20"><a href="#"><img src='assets/images/linkedin.svg' alt='linkedin' height="63" width="63"/></a></li>
    <li class="float-left"><a href="#"><a href="#"><img src='assets/images/stackoverflow.svg' alt='stackoverflow' height="63" width="63"/></a></li>
</ul>
</div>`
};

var footerPanel = {
  directive: "<footer-panel></footer-panel>",
  template: `<footer class="accent-color padding-20 clear fixed">
  <p class="centered">Ⓒ Copyright 2016 Benjamin Baumann</p>
  </footer>`
};

var headerPanel = {
  directive: "<header-panel></header-panel>",
  template: `<div id="banner" class="fixed"></div>
  <div id="wrapper-head">
      <header>
          <h1 id="logo" class="main-color float-left">Benjamin Baumann</h1>
          <nav class="relative float-right">
              <ul>
                  <li><a class="main-color-text nav" href="index">About</a></li>
                  <li><span class="divider">|</span></li>
                  <li><a class="main-color-text nav" href="portfolio">Portfolio</a></li>
                  <li><span class="divider">|</span></li>
                  <li><a class="main-color-text nav" href="contact">Contact</a></li>
              </ul>
          </nav>
      </header>
  </div>`
};

var index = {
  directive: "<content></content>",
  template: `<h2>About Me</h2>
  <hr>
  <img class="padding-right-20 float-left" src='http://placekitten.com/g/300/200' alt='ben' height='200'/>
  <p class="main-color-text margin-bottom-20">Cosby sweater Neutra irony artisan fixie photo booth Carles quinoa tattooed banh mi viral hella hoodie trust
      fund aesthetic yr single-origin coffee McSweeney' s master cleanse put a bird on it plaid pour-over Marfa
      3 wolf moon mumblecore Intelligentsia XOXO Etsy polaroid farm-to-table kitsch wayfarers crucifix mixtape Pinterest
      try-hard pug roof party Pitchfork ennui art party post-ironic whatever Tonx Shoreditch kogi Vice </p>
  <p class="main-color-text clear">tofu umami Odd Future skateboard flexitarian vegan Kickstarter church-key McSweeney's ennui ethical plaid meggings
      farm-to-table Portland readymade seitan food truck Banksy lo-fi Helvetica disrupt chia Etsy hashtag pour-over
  </p>`
};

var portfolio = {
  directive: "<content></content>",
  template: `<h2>About Me</h2>
      <hr>
      <div class="mini-card">
          <img src='assets/images/port1.jpeg' alt='person' height='200' width='290'/>
          <a href="#" class='ribbon'>Hangman</a>
      </div>
      <div class="mini-card">
          <img src='assets/images/port2.jpeg' alt='person' height='200' width='290'/>
          <a href="#" class='ribbon'>RPG Game</a>
      </div>
      
      <div class="mini-card">
          <img src='assets/images/port3.jpeg' alt='person' height='200' width='290'/>
          <a href="#" class='ribbon'>Trivia Game</a>
      </div>
      
      <div class="mini-card">
          <img src='assets/images/port4.jpeg' alt='person' height='200' width='290'/>
          <a href="#" class='ribbon'>Rutgers Info Widget</a>
      </div>
      
      <div class="mini-card">
          <img src='assets/images/port5.jpeg' alt='person' height='200' width='290'/>
          <a href="#" class='ribbon'>Rock Paper Scissors</a>
      </div>`
};

var contact = {
  directive: "<content></content>",
  template: `<h2>Contact</h2>
  <hr>
  <form action="#">
      <label for="name">Name</label><br>
      <input type="text" name="name" id="name" placeholder="John Doe"><br>
      <label for="email">Email</label><br>
      <input type="text" name="email" id="email" placeholder="johndoe@thisisbam.com"><br>
      <label for="message">Message</label><br>
      <textarea name="message" id="message" cols="30" rows="10"></textarea><br>
      <button>Submit</button>
  </form>`
};

// var social = document.getElementsByTagName(social);

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("content").innerHTML = index.template;
  loadSidePanel();
  loadFooterPanel();
  loadHeaderPanel();

  var els = document.getElementsByClassName("nav");

  var elsAsArray = nodeListToArray(els);

  elsAsArray.map(function(el) {
    el.addEventListener("click", processAjaxData, false);
  });
});

function loadHeaderPanel() {
  var headerPanelNode = document.getElementsByTagName("header-panel")[0];
  var body = document.getElementsByTagName("body")[0];
  var div = document.createElement("div");
  div.innerHTML = headerPanel.template;
  var newNode = div;
  body.insertBefore(newNode, headerPanelNode);
  body.removeChild(headerPanelNode);
}

function loadSidePanel() {
  var social = document.getElementsByTagName("social")[0];
  var wrapper = document.getElementById("wrapper");
  var div = document.createElement("div");
  div.innerHTML = sidepanel.template;
  var newNode = div;
  wrapper.insertBefore(newNode, social);
  wrapper.removeChild(social);
}

function loadFooterPanel() {
  var footerPanelNode = document.getElementsByTagName("footer-panel")[0];
  var body = document.getElementsByTagName("body")[0];
  var div = document.createElement("div");
  div.innerHTML = footerPanel.template;
  var newNode = div;
  body.insertBefore(newNode, footerPanelNode);
  body.removeChild(footerPanelNode);
}

function processAjaxData(response, urlPath) {
  var re = /(.*?\/\/.*?)\/(.*?)(.*)/gi;
  var page = this.href.replace(re, "$3");
  if (page === "contact") {
    document.getElementById("content").innerHTML = contact.template;
  }
  if (page === "portfolio") {
    document.getElementById("content").innerHTML = portfolio.template;
  }
  if (page === "index") {
    document.getElementById("content").innerHTML = index.template;
  }
  document.title = response.pageTitle;
  window.history.pushState(
    { html: response.html, pageTitle: response.pageTitle },
    "",
    urlPath
  );
  event.preventDefault();
}

window.onpopstate = function(e) {
  if (e.state) {
    document.getElementById("content").innerHTML = e.state.html;
    document.title = e.state.pageTitle;
  }
};

function nodeListToArray(nodeList) {
  var arr = [];
  for (var index = 0; index < nodeList.length; index++) {
    arr.push(nodeList[index]);
  }
  return arr;
}
