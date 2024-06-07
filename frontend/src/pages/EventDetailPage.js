import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import EventItem from '../components/EventItem';
import EventsList from "../components/EventsList";


const EventDetailPage= ()=> {
    const {event, events} = useRouteLoaderData('event-detail');
    return(
        <>
        <Suspense>
            <Await resolve={event}>
                {(eventDetail)=> <EventItem event={eventDetail} />}
            </Await>
        </Suspense>
         {/* <EventItem  event={data.event} /> */}

        <Suspense>
            <Await resolve={events}>
                {(eventlist)=> <EventsList events= {eventlist} />}
            </Await>
        </Suspense>
        </>
    );
};

export default EventDetailPage;

async function loadEvents () {
    const response = await fetch('http://localhost:8080/events');
  
    if (!response.ok) {
        // throw new Response(JSON.stringify({ message: 'could not fetch events.'}),
        //   {status: 500},
        //   );
        //or we can do this 
      throw json ({message: 'could not fetch events.'},
        {status: 500}
      );
  
    } else {
      const resData = await response.json();
      return resData.events;   //we need events because thats the key in defer
    }
  };

  async function loadEvent (id) {
    const response= await fetch('http://localhost:8080/events/' + id)
    if (!response.ok) {
        throw json({message: 'Could not fetch details for selected event.'},
            {status: 500}
        );
    }else {
        const resData = await response.json();
        return resData.event;
    }    
  };

export const loader= async ({request, params})=> {
    const id= params.eventId;
    return (
        defer({
            event: await loadEvent(id), //so that the page only loads after event detail has been loaded
            events: loadEvents(),
        })
    );
    
};


export async  function action ({params, request}) {
    const eventId = params.eventId;
    const response= await fetch('http://localhost:8080/events/' + eventId, {
        // method: 'DELETE'  or
        method: request.method,
    });
    if (!response.ok) {
        throw json({message: 'Could not fetch details for selected event.'},
            {status: 500}
        );
    }
    return redirect('/events');
};