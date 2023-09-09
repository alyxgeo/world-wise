import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import { Suspense, lazy } from 'react'



import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'

import SpinnerFullPage from './components/SpinnerFullPage'



/*
import Homepage from './pages/HomePage'
import Product from './pages/Product'
import Pricing from '../src/pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
*/


const Homepage = lazy(() => import('./pages/HomePage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('../src/pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))


const App = () => {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>

          <Suspense fallback={<SpinnerFullPage />}>

            <Routes>
              <Route index element={< Homepage />} />

              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />

              <Route path='app' element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >

                <Route index element={<Navigate to='cities' replace />} />

                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />          {/* parm url state*/}

                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>

              <Route path='*' element={<PageNotFound />} />
            </Routes>

          </Suspense>

        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>

  )
}

export default App