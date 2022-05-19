import { createContext, useState } from "react";

export const AppContext = createContext({
    places: [],
    setPlaces: () => {}
});

export const AppProvider = ({children}) => {

    const [places, setPlaces] = useState([])

    return <AppContext.Provider value={{
        places,
        setPlaces
    }}>
        {children}
    </AppContext.Provider>
}