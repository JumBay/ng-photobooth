import {
  Component, ViewChild, ElementRef, AfterViewInit, Renderer, trigger, state, style,
  transition, animate
} from '@angular/core';
import {PhotoService} from "../shared/photo.service";

@Component({
  selector: 'pb-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  animations: [
    trigger('flashState', [
      state('flashOff', style({
        display: 'none',
        opacity: 0,
      })),
      state('flashOn', style({
        display: '',
        opacity: 1
      })),
      transition('flashOn => flashOff', [
        style({
          opacity: 1
        }),
        animate('200ms')]
      ),

      transition('* => flashOn', [
        style({
          opacity: 1
        }),
        animate('0ms')]
      ),
    ])
  ]
})
export class CameraComponent implements AfterViewInit {

  @ViewChild('video') video: ElementRef;
  @ViewChild('img') img: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('beep') beep: ElementRef;
  @ViewChild('flash') flash: ElementRef;

  takePicInProgress: boolean = false;
  preview: boolean = false;
  counter: number = 0;
  flashState: string = 'flashOff';

  constructor(private renderer: Renderer, private photoService: PhotoService) {

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');

    this.getMedia();

    this.renderer.listenGlobal('body', 'click', () => {
      this.takePictureAfterCountdown();
    });
    this.renderer.listenGlobal('body', 'keypress', () => {
      this.takePictureAfterCountdown();
    });
  }

  private getMedia() {

    navigator.getUserMedia({
      video: true,
      audio: false
    }, (stream) => {
      let vendorURL = window.URL;

      this.video.nativeElement.setAttribute('src', vendorURL.createObjectURL(stream));

      this.video.nativeElement.play();


    }, (err) => {
      console.log("An error occured! " + err);
    });
  }

  private startTimer(cb) {
    this.counter = 3;

    this.beep.nativeElement.play();
    let timer = setInterval(() => {
      this.counter--;

      if (this.counter > 0) {
        this.beep.nativeElement.play();
      }

      if (this.counter === 0) {
        clearInterval(timer);
        cb();
      }
    }, 1000);
  }

  flashStateDone(event) {
    if (event.toState === 'flashOn') {
      this.flash.nativeElement.play();
      setTimeout(() => {
        this.takePicture();
        this.flashState = 'flashOff';
      }, 300);
    }
  }

  private takePicture() {
    console.log('takePic');
    let canvasEl = this.canvas.nativeElement;
    let videoEl = this.video.nativeElement;
    let imgEl = this.img.nativeElement;

    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
    let context = canvasEl.getContext('2d');

    // translate context to center of canvas
    context.translate(canvasEl.width, 0);

    // flip context horizontally
    context.scale(-1, 1);

    context.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);

    let data = this.canvas.nativeElement.toDataURL('image/png');

    imgEl.setAttribute('src', data);
    imgEl.style.display = '';
    imgEl.style.display = 'none';

    this.photoService.addToList(data);

    this.preview = true;
    this.takePicInProgress = false;

    setTimeout(() => {
      this.preview = false;
    }, 5000);

  }

  takePictureAfterCountdown() {
    if (this.takePicInProgress) {
      return;
    }
    this.takePicInProgress = true;
    this.preview = false;

    console.log('takePictureAfterCountdown');

    this.startTimer(() => {
      this.flashState = 'flashOn';

    });

  }

}
