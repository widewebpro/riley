import gsap from 'gsap/all';
import { getBounds, handleEvent } from '../../../_helpers';

class DropdownMenu extends HTMLElement {
  constructor() {
    super()

    this.DOM = {}
    this.DOM.el = this
    this.DOM.button = this.querySelector('button')

    this.toggleContentAttr = this.DOM.button.getAttribute('aria-controls');

    this.DOM.wrapper = document.getElementById(this.toggleContentAttr);
    this.DOM.content = document.getElementById(`${this.toggleContentAttr}-content`);

    this.active = false;

    this.events();
  }

  events() {
      handleEvent('click', {
        el: this.DOM.button,
        preventDefault: true,
        callback: () => {
          this.OpenDropdown();
        }
      });
    }

    OpenDropdown(e) {
      this.active = !this.active
      this.classList.toggle('active');

      if (this.active) {
        this.DOM.wrapper.style.display = 'block'
        gsap.to(this.DOM.wrapper, 0.4, {
          height: getBounds(this.DOM.content).height,
          ease: 'Power4.easeOut'
        })
        this.DOM.wrapper.setAttribute('aria-hidden', false)
      } else {
        gsap.to(this.DOM.wrapper, {
          height: 0,
          ease: 'Power4.easeOut',
          onComplete: () => {
            this.DOM.wrapper.setAttribute('aria-hidden', true);
            this.DOM.wrapper.style.display = 'none'
          }
        })
      }
    }
}

export default customElements.define('dropdown-menu', DropdownMenu);
