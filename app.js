(function(){
  // Scroll progress
  const progress = document.querySelector('.progress');
  function onScroll(){ 
    const h = document.documentElement; 
    const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight);
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrolled))})`;
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Current year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Reveal animations on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('reveal'); observer.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.card, .stat, .hero-copy, .hero-img').forEach(el=>{
    el.style.opacity = 0; el.style.transform = 'translateY(16px)'; observer.observe(el);
  });
  const style = document.createElement('style');
  style.textContent = `.reveal{opacity:1 !important; transform:translateY(0) !important; transition: all .6s ease;}`;
  document.head.appendChild(style);
})();