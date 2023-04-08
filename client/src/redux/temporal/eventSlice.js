import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import DateConverter from "../../../scripts/DateConverter";
// export const fetchPlayerList = createAsyncThunk(
//   "team/playerListLoading",
//   async (teamId) => {
//     console.log("entra");
//     const response = await axios.get("http://192.168.0.5:3001/auth");
//     console.log(response.data);
//   }
// );
//$ ESTRUCTURA DE DATOS
//? ej allEvents : [ "date.string" : [event1,event2,event3...]} <- cada key es una DATE y el value es un array de eventos
//? ej event : { categoryName:"bills" , title : {type:"text",value:"Camuzzi"}, firstValue : {type:"number",value:450}, secondValue : {type:"text",value:"nose"} ,description :{type:"text",value:"pagar todo"}}  <- Depende de la estructura de cada categoria los campos de cada evento
//? ej categories : [ { name : "categoryName" , color : "red" , structure : { campo1 : tipoDeDato1, campo2 :tipoDeDato2,...}} , ...] <- Las estructuras son variables dependeiendo de cuantos campos elija el user (maximo 4 ?)
//TODO refactorizar estructura de COMPONENTE FEATURED EVENT PARA QUE SE PAREZCA A INITIAL STATE
const initialState = {
  idCount: 1,
  currentDate: "",
  featuredDates: ["TODAY", "NEXT"],
  allEvents: [],
  categories: [
    {
      categoryName: "BILL",
      color: "#de5f5f",
      structure: {
        title: { type: "text", value: "" },
        firstValue: { type: "number", value: 0 },
        secondValue: { type: "text", value: "" },
        description: { type: "text", value: "" },
      },
    },
    {
      categoryName: "MEETING",
      color: "#73c26b",
      structure: {
        title: { type: "text", value: "" },
        firstValue: { type: "time", value: "12:00" },
        secondValue: { type: "text", value: "" },
        description: { type: "text", value: "" },
      },
    },
    {
      categoryName: "NOTE",
      color: "#a867b5",
      structure: {
        title: { type: "text", value: "" },
        firstValue: { type: "text", value: "" },
        secondValue: { type: "text", value: "" },
        description: { type: "text", value: "" },
      },
    },
  ],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent: (state, action) => {
      const eventsToAdd = createEvents(action.payload, state.idCount);
      //console.log("eventsToAdd ", eventsToAdd);
      state.allEvents = [...state.allEvents, ...eventsToAdd];
      state.idCount = eventsToAdd[eventsToAdd.length - 1].id + 1;
    },
    updateEvent: (state, action) => {
      const { event } = action.payload;
      const foundIndex = state.allEvents.findIndex(
        (event) => event.id === event.id
      );
      if (foundIndex !== -1) {
        state.allEvents[foundIndex] = event;
      }
    },
    deleteEvent: (state, action) => {
      state.allEvents = state.allEvents.filter(
        (event) => event.id !== action.payload
      );
    },
    addFeaturedDate: (state, action) => {
      const date = action.payload;
      const foundDate = state.featuredDates.find(
        (date) => date === action.payload
      );
      if (!foundDate) {
        //state.featuredDates.push(action.payload);
      }
      state.featuredDates.push(date);
    },
    updateFeaturedDates: (state, action) => {
      const today = state.featuredDates[0];
      const next = state.featuredDates[1];
      for (let i = state.featuredDates.length - 1; i > 1; i--) {
        const date = state.featuredDates[i];
        if (date === today || date === next) {
          state.featuredDates.splice(i, 1);
        }
      }
      action.payload();
    },
    removeFeaturedDate: (state, action) => {
      //todo remover de featured events - entra action.payload -> date = "2023-07-25"
      const indexFound = state.featuredDates.findIndex(
        (date) => date === action.payload.date
      );
      state.featuredDates.splice(indexFound, 1);
      //action.payload.onRemove();
    },
    setTodayDate: (state, action) => {
      state.featuredDates[0] = action.payload;
    },
    setNextDate: (state, action) => {
      const currentDate = action.payload;
      let nextDateFound = DateConverter.fromUnixToCalendarDate(
        2147483647 * 1000
      ); //end of time
      let dateFound = false;
      for (let i = 0; i < state.allEvents.length; i++) {
        const event = state.allEvents[i];
        if (DateConverter.isGreater(event.date, currentDate)) {
          if (DateConverter.isGreater(nextDateFound, event.date)) {
            nextDateFound = event.date;
            dateFound = true;
          }
        }
      }
      if (!dateFound) nextDateFound = currentDate;
      state.featuredDates[1] = nextDateFound;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    resetAllEvents: async (state, action) => {
      //state.allEvents = [];
      //state.categories = [];
      await AsyncStorage.removeItem("root");
      // console.log("allEvents", current(state.allEvents));
      // console.log("featuredEvents", current(state.featuredEvents));
      //AsyncStorage.clear().then(() => console.log("nice"));
    },
    default: (state) => state,
  },
});
//! HELPERS
function createEvents(event, headerId) {
  switch (event.repeatType) {
    case "weekly": //$weekly
      //? en 5 años hay 52 * 5 semanas  = 260
      return generateRepeatingArray(event, headerId, 260, 7);
    case "monthly": //$monthly
      //? en 5 años hay 12 * 5 meses = 60
      return generateRepeatingArray(event, headerId, 60, 30);
    case "yearly": //$yearly
      //? 5 años
      return generateRepeatingArray(event, headerId, 5, 365);
    default: //$no repeat
      return [{ id: headerId, ...event, headerId: null }];
  }
}

function generateRepeatingArray(event, headerId, iterations, ammountOfDays) {
  let idCount = headerId;
  let currentDate = event.date;
  const arr = [];
  arr.push({ id: idCount, ...event, repeatList: [], headerId });
  for (let i = 1; i < iterations; i++) {
    currentDate = DateConverter.incrementDate(currentDate, ammountOfDays);
    if (currentDate !== null) {
      idCount++;
      arr.push({ id: idCount, ...event, date: currentDate, headerId });
      arr[0].repeatList.push(idCount);
    }
  }
  //console.log("arr ", arr);
  return arr;
}

function removeFromFeatured(featuredEvents, eventId) {
  const result = [...featuredEvents];
  featuredEvents.forEach((fe) => {
    fe.eventList.forEach((feCategory) => {
      const foundIndex = feCategory.findIndex((ele) => ele.id === eventId);
      if (foundIndex != -1) feCategory.splice(foundIndex, 1);
    });
  });
  return result;
}
function updateEventList(eventList, event) {
  const result = [...eventList];
  for (let i = 0; i < result.length; i++) {
    const cat = result[i];
    //TODO BANDA SEGUIR
  }
  result.forEach((cat) => {
    if (cat[0].categoryName === event.categoryName) {
    }
  });
}
function createEventList(date, allEvents, categories) {
  const eventList = [];
  const eventsDate = allEvents.filter((event) => event.date === date);
  categories.forEach((category) => {
    const groupCategory = eventsDate.filter(
      (event) => event.categoryName === category.categoryName
    );
    if (groupCategory.length > 0) eventList.push(groupCategory);
  });
  return eventList;
}
//$ Action creators
export const {
  createEvent,
  deleteEvent,
  updateEvent,
  resetAllEvents,
  addFeaturedDate,
  setTodayDate,
  setNextDate,
  setCurrentDate,
  updateFeaturedDates,
  removeFeaturedDate,
} = eventSlice.actions;

export default eventSlice.reducer;
