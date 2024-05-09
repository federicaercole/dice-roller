import { Menu } from './components/Menu';
import { Outlet } from 'react-router-dom';

function App() {

  return (<>
    <main>
      <Outlet />
    </main>
    <Menu />
  </>)
}

export default App
