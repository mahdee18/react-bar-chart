import React from 'react';
import BarChart from './components/Barchart';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-green-500 text-4xl font-bold text-center py-10'>React Bar Chart Task</h1>
      </header>
      <BarChart></BarChart>
    </div>
  );
};

export default App;
