/* =========================================================
   DATOS DE LA GALERÍA
   Sustituye "svg" por tu propia imagen real:
   <img src="ruta/obra-01.jpg" alt="..." loading="lazy">
========================================================= */
(function(){

  // ---- 20 obras de ejemplo (placeholders SVG variados) ----
  var palettes = ["#E7D2B4","#E3CBA9","#EAD9BE","#DCC49E","#EFDFC4","#E6D5B8"];
  var categorias = ["retratos","caricaturas","parejas","familias"];
  var titulos = {
    retratos:["Retrato a lápiz","Retrato al carboncillo","Retrato al pastel","Retrato en tonos cálidos"],
    caricaturas:["Caricatura con humor","Caricatura de cumpleaños","Caricatura a color","Caricatura clásica"],
    parejas:["Retrato de pareja","Primer baile","Aniversario de boda","Dos miradas"],
    familias:["Retrato familiar","Tres generaciones","Familia y mascota","Reunión especial"]
  };

  function personSVG(seed, cat){
    var p = palettes[seed % palettes.length];
    var isCarto = cat === "caricaturas";
    var headR = isCarto ? 100 : 85;
    var strokeCol = "#3a332c";
    var double = (cat === "parejas" || cat === "familias");
    var svg = '<svg viewBox="0 0 300 340" preserveAspectRatio="xMidYMid slice">';
    svg += '<rect width="300" height="340" fill="'+p+'"/>';
    if(double){
      svg += '<circle cx="115" cy="150" r="'+ (headR-25) +'" fill="none" stroke="'+strokeCol+'" stroke-width="1.6" opacity=".9"/>';
      svg += '<circle cx="195" cy="150" r="'+ (headR-25) +'" fill="none" stroke="'+strokeCol+'" stroke-width="1.6" opacity=".9"/>';
      svg += '<path d="M60 300c8-70 35-100 55-100M240 300c-8-70-35-100-55-100" fill="none" stroke="'+strokeCol+'" stroke-width="1.4"/>';
    } else {
      svg += '<circle cx="150" cy="150" r="'+ headR +'" fill="none" stroke="'+strokeCol+'" stroke-width="'+(isCarto?2.4:1.6)+'" opacity=".9"/>';
      svg += '<path d="M85 300c10-75 40-115 65-115s55 40 65 115" fill="none" stroke="'+strokeCol+'" stroke-width="1.5"/>';
    }
    svg += '<g stroke="'+strokeCol+'" stroke-width=".6" opacity=".3"><path d="M20 20l50 50M40 10l60 60"/><path d="M280 320l-50-50M260 330l-60-60"/></g>';
    svg += '</svg>';
    return svg;
  }

  var grid = document.getElementById('galleryGrid');
  var items = [];
 /* for(var i=0;i<20;i++){
    var cat = categorias[i % categorias.length];
    var titleList = titulos[cat];
    var title = titleList[i % titleList.length];
    items.push({id:i, cat:cat, title:title, art:personSVG(i,cat)});
  } */

  var imagenesReales = [
  {src:"imagenes/retrato-abuela.webp", cat:"retratos",    title:"Retrato a lápiz"},
  {src:"imagenes/retrato-abuela-lapiz.jpeg", cat:"caricaturas", title:"Caricatura de cumpleaños"},
  {src:"imagenes/retrato-abuela-perfil.webp", cat:"parejas",     title:"Retrato de pareja"},
  {src:"imagenes/retrato-abuelo-lapiz.jpeg", cat:"retratos",    title:"Retrato a lápiz"},
  {src:"imagenes/retrato-acuarela-perfil.webp", cat:"caricaturas", title:"Caricatura de cumpleaños"},
  {src:"imagenes/retrato-frontal-lapiz.webp", cat:"parejas",     title:"Retrato de pareja"},
  {src:"imagenes/retrato-iaio-lapiz.webp", cat:"retratos",    title:"Retrato a lápiz"},
  {src:"imagenes/retrato-iaio-perfil.webp", cat:"caricaturas", title:"Caricatura de cumpleaños"},
  {src:"imagenes/retrato-lapiz-abuelo.jpeg", cat:"parejas",     title:"Retrato de pareja"},
  {src:"imagenes/retrato-lapiz-perfil.jpeg", cat:"retratos",    title:"Retrato a lápiz"},
  {src:"imagenes/retrato-lapiz-señor.jpeg", cat:"caricaturas", title:"Caricatura de cumpleaños"},
  {src:"imagenes/retrato-perfil-acuarela.webp", cat:"parejas",     title:"Retrato de pareja"},
  {src:"imagenes/retrato-perfil-iaio.webp", cat:"retratos",    title:"Retrato a lápiz"},
  {src:"imagenes/caricatura-serie-animada.jpeg", cat:"caricaturas", title:"Caricatura de cumpleaños"},
  {src:"imagenes/retrato-perfil-señor-lapiz.webp", cat:"parejas",     title:"Retrato de pareja"},
  {src:"imagenes/retrato-señora.webp", cat:"retratos",    title:"Retrato a lápiz"},
  {src:"imagenes/retrato-señora-perfil.webp", cat:"caricaturas", title:"Caricatura de cumpleaños"},
  {src:"imagenes/retrato-señor-perfil.jpeg", cat:"parejas",     title:"Retrato de pareja"},
  ];
var items = imagenesReales.map(function(img, i){
  return {
    id: i,
    cat: img.cat,
    title: img.title,
    art: '<img src="'+img.src+'" alt="'+img.title+'" loading="lazy">'
  };
});
  items.forEach(function(item){
    var el = document.createElement('figure');
    el.className = 'gallery-item reveal in';
    el.setAttribute('data-cat', item.cat);
    el.setAttribute('tabindex','0');
    el.setAttribute('role','button');
    el.setAttribute('aria-label','Ver obra: '+item.title);
    el.innerHTML =
      '<div class="art-box">'+item.art+'</div>'+
      '<div class="gallery-item-overlay"><span>'+item.title+'</span></div>';
    el.addEventListener('click', function(){ openLightbox(item.id); });
    el.addEventListener('keypress', function(e){ if(e.key==='Enter') openLightbox(item.id); });
    grid.appendChild(el);
  });

  // ---- Filtros ----
  var filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      document.querySelectorAll('.gallery-item').forEach(function(gi){
        var match = (f === 'todos' || gi.getAttribute('data-cat') === f);
        gi.classList.toggle('hide', !match);
      });
    });
  });

  // ---- Lightbox ----
  var lightbox = document.getElementById('lightbox');
  var lbFrame = document.getElementById('lightboxFrame');
  var lbCaption = document.getElementById('lightboxCaption');
  var currentIndex = 0;

  function visibleItems(){
    var f = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    return items.filter(function(it){ return f==='todos' || it.cat===f; });
  }

  function openLightbox(id){
    var vis = visibleItems();
    currentIndex = vis.findIndex(function(it){ return it.id === id; });
    if(currentIndex < 0) currentIndex = 0;
    renderLightbox(vis);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function renderLightbox(vis){
    var item = vis[currentIndex];
    lbFrame.innerHTML = item.art;
    lbCaption.textContent = item.title + ' — hecho a mano por encargo';
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lightboxPrev').addEventListener('click', function(){
    var vis = visibleItems();
    currentIndex = (currentIndex - 1 + vis.length) % vis.length;
    renderLightbox(vis);
  });
  document.getElementById('lightboxNext').addEventListener('click', function(){
    var vis = visibleItems();
    currentIndex = (currentIndex + 1) % vis.length;
    renderLightbox(vis);
  });
  document.addEventListener('keydown', function(e){
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
    if(e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
  });

  // ---- FAQ acordeón ----
  document.querySelectorAll('.faq-item').forEach(function(faqItem){
    var q = faqItem.querySelector('.faq-q');
    var a = faqItem.querySelector('.faq-a');
    function setState(open){
      faqItem.classList.toggle('open', open);
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    }
    setState(faqItem.classList.contains('open'));
    q.addEventListener('click', function(){
      var willOpen = !faqItem.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(other){
        if(other !== faqItem){
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = '0px';
        }
      });
      setState(willOpen);
    });
  });

  // ---- Slider antes/después del hero ----
  var baRange = document.getElementById('baRange');
  var baSketch = document.querySelector('.ba-sketch');
  var baHandle = document.querySelector('.ba-handle');
  function updateBA(val){
    baSketch.style.clipPath = 'inset(0 0 0 ' + val + '%)';
    baHandle.style.left = val + '%';
  }
  if(baRange){
    baRange.addEventListener('input', function(){ updateBA(this.value); });
    updateBA(baRange.value);
  }

  // ---- Menú móvil ----
  var burger = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var backdrop = document.getElementById('menuBackdrop');
  var closeMenuBtn = document.getElementById('closeMenu');
  function openMenu(){ mobileMenu.classList.add('open'); backdrop.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeMenu(){ mobileMenu.classList.remove('open'); backdrop.classList.remove('open'); document.body.style.overflow=''; }
  burger.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  // ---- Header sticky con sombra al hacer scroll + CTA aparece ----
  var header = document.getElementById('siteHeader');
  var navCta = document.getElementById('navCta');
  window.addEventListener('scroll', function(){
    var sc = window.scrollY > 30;
    header.classList.toggle('scrolled', sc);
    navCta.style.display = window.innerWidth > 900 ? 'inline-flex' : 'none';
  });
  navCta.style.display = window.innerWidth > 900 ? 'inline-flex' : 'none';

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(function(el){ el.classList.remove('in'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(function(el){ io.observe(el); });

  // ---- Año en footer ----
  document.getElementById('year').textContent = new Date().getFullYear();

})();
