import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { LoginSignup } from './pages/LoginSignup'
import { StayDetails } from './pages/StayDetails'
import { StayApp } from './pages/StayApp'
import { Trips } from './pages/Trips'
import { Dashboard } from './pages/Dashboard'
import { WishList } from './pages/WishList'
import { Footer } from './cmps/Footer'
import { NewHomeForm } from './pages/NewHomeForm'
import { MyStays } from './pages/MyStays'


export function App() {
  return (
    <div className="app">
      <Router>
        <main className="main-container">
          <Switch>
            <Route path="/stay/:id" component={StayDetails} />
            <Route path="/stay" component={StayApp} />
            <Route path="/trips" component={Trips} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/wishList" component={WishList} />
            <Route path="/myStays" component={MyStays} />
            <Route path="/add" component={NewHomeForm} />
            <Route path="/login" component={LoginSignup} />
            <Route path="/signup" component={LoginSignup} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <footer className="main-container">
        <Footer/>
        </footer>
      </Router>
    </div>
  )
}

