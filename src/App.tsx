import './App.css';

import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TableInventory from './components/tables/TableInventory';
import TableCustomers from './components/tables/TableCustomers';
import TableSales from './components/tables/TableSales';

import NewClient from './components/forms/NewCustomer';
import NewProduct from './components/forms/NewProduct';
import NewSale from './components/forms/NewSale';
import NewStock from './components/forms/NewStock';

import EditCustomer from './components/forms/EditCustomer';
import EditProduct from './components/forms/EditProduct';

import TopBar from './components/TopBar';

const App = (): ReactElement => {
    return (
        <Router>
            <nav> <TopBar /> </nav>
            <Routes>
                <Route path='/inventory-manager' element={<TableInventory />} />
                <Route path='/inventory-manager/sales' element={<TableSales />} />
                <Route path='/inventory-manager/customers' element={<TableCustomers />} />

                <Route path='/inventory-manager/newcustomer' element={<NewClient />} />
                <Route path='/inventory-manager/newproduct' element={<NewProduct />} />
                <Route path='/inventory-manager/newstock' element={<NewStock />} />
                <Route path='/inventory-manager/newsale' element={<NewSale />} />

                <Route path='/inventory-manager/editcustomer' element={<EditCustomer />} />
                <Route path='/inventory-manager/editproduct' element={<EditProduct />} />
            </Routes>
        </Router >
    );
};

export default App;
