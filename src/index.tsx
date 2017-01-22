import * as React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Interface from "./interface";
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Interface/>
  </MuiThemeProvider>,
  document.querySelector('div')
);