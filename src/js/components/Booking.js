import { select, templates } from './../settings.js';
import utils from './../utils.js';

class Booking{
  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidget();
  }

  render(element){
    const thisBooking = this;
        
    const generatedHTML = templates.bookingWidget();

    thisBooking.element = utils.createDOMFromHTML(generatedHTML);

    const bookingContainer = document.querySelector(select.containerOf.booking);

    bookingContainer.appendChild(thisBooking.element);

    thisBooking.dom = {
        wrapper: element,
    };
    

  }

  initWidget(){
    const thisBooking = this;

    console.log(thisBooking);
  }
}
export default Booking; 