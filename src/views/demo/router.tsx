import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function Container() {
    let history = useHistory()
    const change = () => {
        history.push('/demo/dashboard')
    }
    return <div>
        <ul>
            <li>
                <Link to="/demo/">Home</Link>
            </li>
            <li>
                <Link to="/demo/about">About</Link>
            </li>
            <li>
                <Link to="/demo/dashboard">Dashboard</Link>
            </li>
        </ul>
        <button onClick={() => change()}>change</button>
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
            <Route exact path="/demo">
                <Home />
            </Route>
            <Route path="/demo/about">
                <About />
            </Route>
            <Route path="/demo/dashboard">
                <Dashboard />
            </Route>
        </Switch>
    </div>
}
export default function RouterTest() {
    return (
        <Router>
            <Container/>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}