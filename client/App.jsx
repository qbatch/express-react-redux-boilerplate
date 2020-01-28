import React from 'react';

import switchRoutes from './routes/switchRoutes';
import appRoutes from './routes/appRoutes';

const App = () => {
  return (
    <div>
      { switchRoutes(appRoutes) }
    </div>
  )
}

export default App;
