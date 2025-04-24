import { Component, ElementRef, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor-follower',
  templateUrl: './cursor-follower.component.html',
  styleUrls: ['./cursor-follower.component.scss'],
  standalone: true
})
export class CursorFollowerComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(){
    const follower = this.el.nativeElement.querySelector('.cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    document.addEventListener('mousemove', (e) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
    })

    gsap.set(follower, {
      x: posX,
      y: posY
    })
  }

}
