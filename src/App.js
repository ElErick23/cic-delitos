import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/shared/Navbar';
import Layout from './components/layout/Layout';
import Maps from './pages/Maps';
import Results from './pages/Results';
import Statistics from './pages/Statistics';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Kdam Thmor Pro', sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/mapas" element={<Maps />} />
            <Route exact path="/resultados" element={<Results />} />
            <Route exact path="/estadisticas" element={<Statistics />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App;
