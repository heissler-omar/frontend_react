import logo from './logo.svg';
import './App.css';
import { Row, Col } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from "react-router-dom";

import ViewUsers from './components/viewUsers/ViewUsers';
import CreateUsers from './components/createUsers/CreateUsers';
import Home from './components/home/Home';
import Projects from './components/projects/Projects';
import ViewUser from './components/viewUser/ViewUser';
import EditUser from './components/editUser/EditUser';
import CreateProject from './components/createProject/CreateProject';
import Project from './components/project/Project';
import EditProject from './components/editProject/editProject';
import UserProjects from './components/userProjects/UserProjects';

function App() {
  return (

    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Router>
        <Row className="ComponentRow">
          <Col xs="1" className="sideBar">
            <Row className="navRows">
              <NavLink to="/" className="btn btn-dark" activeClassName="selected">
                Home
              </NavLink>
            </Row>
            <Row className="navRows">
              <NavLink to="/users/new" className="btn btn-dark" activeClassName="selected">
                Crear usuario
              </NavLink>
            </Row>
            <Row className="navRows">
              <NavLink to="/projects/new" className="btn btn-dark" activeClassName="selected">
                Crear proyecto
              </NavLink>
            </Row>
            <Row className="navRows">
              <NavLink to="/users" className="btn btn-dark" activeClassName="selected">
                Usuarios
              </NavLink>
            </Row>
            <Row className="navRows">
              <NavLink to="/projects" className="btn btn-dark" activeClassName="selected">
                Proyectos
              </NavLink>
            </Row>
          </Col>

          <Col className="componentsCol">
            <Switch>
              <Route path="/users/:id/projects" exact>
                <UserProjects />
              </Route>
              <Route path="/users/:id/edit" exact>
                <EditUser />
              </Route>
              <Route path="/projects/:id/edit" exact>
                <EditProject />
              </Route>
              <Route path="/users/new" exact>
                <CreateUsers />
              </Route>
              <Route path="/projects/new" exact>
                <CreateProject />
              </Route>
              <Route path="/users/:id" exact>
                <ViewUser />
              </Route>
              <Route path="/projects/:id" exact>
                <Project />
              </Route>
              <Route path="/users" exact>
                <ViewUsers />
              </Route>
              <Route path="/projects" exact>
                <Projects />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>

    </div>

  );
}

export default App;
