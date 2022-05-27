import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ListOfInventory from './components/ListOfInventory'
import TopBar from './components/TopBar';
import NewClient from './components/NewClient';
import NewProduct from './components/NewProduct';
import EditClient from './components/EditClient';
import EditProduct from './components/EditProduct';
import NewSale from './components/NewSale';
import ListOfSales from './components/ListOfSales';
import ListOfClients from './components/ListOfClients';

const App = () => {
    const [count, setCount] = useState(0)

    return (
        <Router>
            <nav>
                <TopBar />
            </nav>
            <Routes>
                <Route path='/' element={
                    <ListOfInventory />
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

                <Route path='/newsale' element={
                    <NewSale />
                }>
                </Route>

                <Route path='/sales' element={
                    <ListOfSales />
                }>
                </Route>

                <Route path='/clients' element={
                    <ListOfClients />
                }>
                </Route>
            </Routes>
        </Router >
    )
}

export default App
