import { Component, ChangeDetectorRef, Inject } from "@angular/core";
import e from "../event-bus";

@Component({
  selector: "AngularApp",
  template: `
    <div style="margin-top: 100px;">
      <h1>Angular Component</h1>
      <p>{{ message }}</p>
      <p *ngIf="counter">Click count is: {{ counter }}</p>
    </div>
  `
})
export default class AngularApp {
  message: string = "Message from React should appear here 😱";
  counter: number;

  constructor(
    @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    e.on("message", message => {
      this.message = message.text;
      this.changeDetector.detectChanges();
      this.returnMessageToReactWhenReceived();
    });

    window.addEventListener("countIncreased", () => {
      this.counter = window["spa"].counter.count;
    });
  }

  returnMessageToReactWhenReceived() {
    e.emit("received", { text: "Woohoo! Hello from Angular! 🎉" });
  }
}
