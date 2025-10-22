import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Compras from './pages/Compras';
import Proyectos from './pages/Proyectos';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Compras />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/proyectos" element={<Proyectos />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;