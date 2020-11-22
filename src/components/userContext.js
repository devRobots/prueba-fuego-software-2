import React, {useState} from 'react' 

const Context = React.createContext({})

export function UserContextProvider({children}){
    const [usuario, setUsuario] = useState([])

    return <Context.Provider value={{usuario, setUsuario}}>
        {children}
    </Context.Provider>
}

export default Context