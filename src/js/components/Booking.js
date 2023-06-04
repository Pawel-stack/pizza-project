import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';
import { select, templates } from './../settings.js';
import utils from './../utils.js';
import AmountWidget from './AmountWidget.js';

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
      peopleAmount: element.querySelector(select.booking.peopleAmount),
      hoursAmount: element.querySelector(select.booking.hoursAmount),
      datePicker: element.querySelector(select.widgets.datePicker.wrapper),
      hourPicker: element.querySelector(select.widgets.hourPicker.wrapper),
    };

  }

  initWidget(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    
    thisBooking.dom.peopleAmount.addEventListener('updated', function(){
    });

    thisBooking.dom.hoursAmount.addEventListener('updated', function(){
    });

    thisBooking.dom.datePicker.addEventListener('updated', function(){

    });
    thisBooking.dom.hourPicker.addEventListener('updated', function(){

    });
  }
}
export default Booking; 