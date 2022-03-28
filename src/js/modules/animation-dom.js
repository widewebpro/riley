import gsap from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';

class AnimationDom extends HTMLElement {
  constructor() {
    super();

    this.DOM = {};
    this.DOM.el = this;
    this.events();
  }

  events() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.gs_reveal').forEach((elem) => {
      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => { this.animateFrom(elem)}
      });
    });
  }

  animateFrom(elem, direction) {
    if(!elem.classList.contains('--active-animation')) {
      direction = direction || 1;
      let x = 0;
      let y = direction * 100;

      if(elem.classList.contains('gs_reveal_fromTop')) {
        x = 0;
        y = 100;
      } else if(elem.classList.contains('gs_reveal_fromSideLeft')) {
        x = -100;
        y = 0;
      } else if(elem.classList.contains('gs_reveal_fromSideRight')) {
        x = 100;
        y = 0;
      }

      elem.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      elem.style.opacity = '0';
      gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 0.8,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: 'Power1.easeOut',
        overwrite: 'auto'
      });

      elem.classList.add('--active-animation');
    }
  }

  hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
  }
}

export default customElements.define('animation-dom', AnimationDom);
