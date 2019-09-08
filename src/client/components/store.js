import React from 'react'
import PropTypes from 'prop-types';

const storeContext = React.createContext(null)

export const StoreProvider = ({ store, children }) => {
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

StoreProvider.propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
};

export const useStore = () => {
    const store = React.useContext(storeContext)
    if (!store) {
        throw new Error('You have forgot to use StoreProvider, shame on you.')
    }
    return store
}
