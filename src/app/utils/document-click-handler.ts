export class DocumentClickHandler {
  // All global document:click events should be bound
  // using this class because multiple @HostListener('document:click')
  // reduce performance dramatically.

  static handlers = [];
  static addHandler(handler: Handler) {
    DocumentClickHandler.handlers.push(handler);
  }
  static globalClickHandler(event) {
    DocumentClickHandler.handlers =
      DocumentClickHandler.handlers.filter((h) => h.component.isAlive);
    DocumentClickHandler.handlers.forEach((h) => h.handler(event));
  }
}

export interface AliveAwareComponent {
  isAlive: boolean;
}
interface Handler {
  component: AliveAwareComponent;
  handler: (e) => void;
}
