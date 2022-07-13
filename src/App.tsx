import './App.css';

import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TableInventory from './components/tables/TableInventory';
import TableCustomers from './components/tables/TableCustomers';
import TableSales from './components/tables/TableSales';

import TopBar from './components/navigation/TopBar';

const App = (): ReactElement => {
    return (
        <>
            <TopBar />

            <div className='mainContent'>
                <Router>
                    <Routes>
                        <Route path='/inventory-manager/' element={<TableInventory />} />
                        <Route path='/inventory-manager/sales' element={<TableSales />} />
                        <Route path='/inventory-manager/customers' element={<TableCustomers />} />
                    </Routes>
                </Router>
            </div>
        </>
    );
};

export default App;
