import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Event } from '../data/mockEvents';

interface AppState {
  rsvpEvents: Set<number>;
  loading: boolean;
  error: string | null;
}

type AppAction = 
  | { type: 'RSVP_EVENT'; payload: number }
  | { type: 'CANCEL_RSVP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  rsvpEvents: new Set(),
  loading: false,
  error: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'RSVP_EVENT':
      return {
        ...state,
        rsvpEvents: new Set([...state.rsvpEvents, action.payload])
      };
    case 'CANCEL_RSVP':
      const newRsvpEvents = new Set(state.rsvpEvents);
      newRsvpEvents.delete(action.payload);
      return {
        ...state,
        rsvpEvents: newRsvpEvents
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function useRSVP() {
  const { state, dispatch } = useApp();

  const rsvpToEvent = (eventId: number) => {
    dispatch({ type: 'RSVP_EVENT', payload: eventId });
  };

  const cancelRSVP = (eventId: number) => {
    dispatch({ type: 'CANCEL_RSVP', payload: eventId });
  };

  const isRSVPed = (eventId: number) => {
    return state.rsvpEvents.has(eventId);
  };

  return {
    rsvpToEvent,
    cancelRSVP,
    isRSVPed,
    rsvpEvents: Array.from(state.rsvpEvents)
  };
}