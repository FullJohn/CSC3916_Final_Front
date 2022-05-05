import React from 'react';
import './App.css';
import AppHeader from './components/appheader';
import PostList from './components/Posts';
import Post from './components/Post';
import Authentication from './components/authentication';
import {HashRouter,Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './stores/store'

require("dotenv").config();
function App() {
  return (
      <div className="App">
        <Provider store={store}>
          <HashRouter>
            <div>
              <AppHeader/>
              <Route exact path="/" render={()=><PostList />}/>
              <Route exact path="/post/:postId" render ={() =><Post />}/>
              <Route path="/signin" render={()=><Authentication />}/>
            </div>
          </HashRouter>
        </Provider>
      </div>
  );
}

export default App;
