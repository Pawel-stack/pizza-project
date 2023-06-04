import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';
import { select, templates, settings } from './../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';

class Booking{
  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidget();
    thisBooking.getData();  
  }

  getData(){
    const thisBooking = this; 

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam =  settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],

      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],

      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };

    //console.log('getDataparams', params);

    const urls = {
      booking:       settings.db.url + '/' + settings.db.booking 
                                     + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event   
                                     + '?' + params.eventsCurrent.join('&'),
      eventsrRepeat: settings.db.url + '/' + settings.db.event 
                                     + '?' + params.eventsRepeat.join('&'),
    }; 

    //console.log('getDataUrls', urls);

    Promise.all([
      fetch(urls.booking),
    ])
      .then(function(allResponses){
        const bookingResponse = allResponses[0];
        return Promise.all([
          bookingResponse.json(),
        ]);
      })
      .then(function([bookings]){
        console.log(bookings);
      });
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