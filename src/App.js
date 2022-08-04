import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ProjectListScreen } from './screens/project-list'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ProjectListScreen />
      </BrowserRouter>
    </div>
  )
}

export default App
