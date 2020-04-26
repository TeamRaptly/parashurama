
import React from 'react'
import Header from './header'

const App = ( { children } ) => (
    <main>
        <Header />
        {children}
    </main>
);

export default App;