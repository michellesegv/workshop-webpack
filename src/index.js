import React from 'react'
import { render } from 'react-dom'

const Page = () => (
  <div>
    <p>
      Ejemplo webpack, si me vez funciona React
    </p>
  </div>
);

render(
  <Page />,
  document.getElementById('root')
);