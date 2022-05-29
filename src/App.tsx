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
import NewBatch from './components/NewBatch';
import { ReactElement } from 'react';

const App = (): ReactElement => {
    return (
        <Router>
            <nav>
                <TopBar />
            </nav>
            <Routes>
                <Route path='/inventory-manager' element={
                    <ListOfInventory />
                }>
                </Route>

                <Route path='/inventory-manager/newclient' element={
                    <NewClient />
                }>
                </Route>

                <Route path='/inventory-manager/newproduct' element={
                    <NewProduct />
                }>
                </Route>

                <Route path='/inventory-manager/editclient' element={
                    <EditClient />
                }>
                </Route>

                <Route path='/inventory-manager/editproduct' element={
                    <EditProduct />
                }>
                </Route>

                <Route path='/inventory-manager/newbatch' element={
                    <NewBatch />
                }>
                </Route>

                <Route path='/inventory-manager/newsale' element={
                    <NewSale />
                }>
                </Route>

                <Route path='/inventory-manager/sales' element={
                    <ListOfSales />
                }>
                </Route>

                <Route path='/inventory-manager/clients' element={
                    <ListOfClients />
                }>
                </Route>
            </Routes>
        </Router >
    )
}

export default App
