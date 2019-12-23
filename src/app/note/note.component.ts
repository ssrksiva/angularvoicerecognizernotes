import {Component, HostBinding, EventEmitter, Output, ElementRef, Input} from '@angular/core'
//declare var webkitSpeechRecognition:any;
//declare var SpeechRecognition:any;
@Component({
  selector:'app-note',
  templateUrl:'./note.component.html',
  styleUrls:['./note.component.css']
})

export class NoteComponent {
  //SpeechRecognition:any =webkitSpeechRecognition;
  
  recognition:any;
  @Input()
  content: string;
  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  constructor(private el:ElementRef) {
   const {webkitSpeechRecognition} : IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event)=> {
      this.el.nativeElement.querySelector(".content").value += event.results[0][0].transcript
      console.log('in rsult ',event.results[0][0].transcript) 
      document.getElementById('toolbar').focus();
     this.showHide("add")
    };

    this.recognition.onnomatch = () => {
      this.showHide("add");
    }
  }
  
  showHide(action){
    if(action === "add") {
      document.getElementsByClassName('voice')[0].classList.add("show");
    } else {
       document.getElementsByClassName('voice')[0].classList.remove("show");
    }
  }
  onDismiss(event){
    this.dismiss.emit(event);
  }
  
  onFocusOut(event){
    this.focusout.emit(event)
  }

  record(event) {
    this.showHide("remove");
    this.recognition.start();
  }

}

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}