import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Burger Shak Under Construction</h1>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
