import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inventory from './components/Inventory'
import TopBar from './components/TopBar';
import NewClient from './components/NewClient';
import NewProduct from './components/NewProduct';
import EditClient from './components/EditClient';
import EditProduct from './components/EditProduct';

const App = () => {
    const [count, setCount] = useState(0)

    return (
        <Router>
            <nav>
                <TopBar />
            </nav>
            <Routes>
                <Route path='/' element={
                    <div className='table'>
                        <Inventory />
                    </div>
                }>
                </Route>

                <Route path='/newclient' element={
                    <NewClient />
                }>
                </Route>

                <Route path='/newproduct' element={
                    <NewProduct />
                }>
                </Route>

                <Route path='/editclient' element={
                    <EditClient />
                }>
                </Route>

                <Route path='/editproduct' element={
                    <EditProduct />
                }>
                </Route>
            </Routes>
        </Router >
    )
}

export default App
