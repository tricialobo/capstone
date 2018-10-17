import React, { Component } from 'react'
import { Navbar } from './components'
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    title: {
      fontWeight: 700,
      fontSize: 28
    },
    subheading: {
      fontWeight: 700,
      fontSize: 18
    },
    body1: {
      fontWeight: 500,
      fontSize: 16
    },
    display3: {
      color: '#000',
      fontWeight: 700
    },
    display2: {
      color: '#000',
      fontWeight: 700
    },
    display1: {
      color: '#000',
      fontWeight: 700
    },
    button: {
      fontWeight: 700,
      textTransform: 'unset'
    }
  },
  palette: {
    primary: {
      main: '#86c7bf'
    },
    secondary: {
      main: '#000'
    }
  },
  shadows: Array(25).fill('none'),
  overrides: {
    MuiButton: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        borderRadius: 0,
        border: 'solid #000 2px',
        minHeight: 45,
        marginBottom: 18,
        marginTop: 18
      }
    },
    MuiPaper: {
      root: {
        MuiExpansionPanelSummary: {
          root: {
            expanded: {
              content: {
                margin: 0,
                display: 'none'
              }
            }
          }
        }
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        paddingTop: 0
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: 14,
        fontWeight: 500
      }
    },
    MuiList: {
      // root: {
      //   border: 'solid 2px #000'
      // }
    },
    MuiIconButton: {
      root: {
        color: '#000'
      }
    },
    MuiFormLabel: {
      root: {
        color: '#000'
      }
    },
    MuiInput: {
      underline: '#000'
    },
    MuiDivider: {
      root: {
        height: 2,
        backgroundColor: '#000'
      }
    },
    MuiListSubheader: {
      root: {
        fontSize: 18,
        fontWeight: 600,
        color: '#000'
      }
    },
    MuiListItemText: {
      primary: {
        fontSize: 16,
        fontWeight: 500
      }
    },
    MuiCardHeader: {
      title: {
        fontWeight: 700
      }
    },
    MuiFormControl: {
      root: {
        marginTop: 16
      }
    },
    MuiNotchedOutline: {
      disabled: {
        border: 'solid 2px',
        borderColor: 'black',
        borderRadius: 0
      }
    },
    MuiInputBase: {
      disabled: {
        fontFamily: 'monospace'
      }
    },
    MuiListItem: {
      selected: {
        borderBottom: '2px solid',
        backgroundColor: '#fff'
      },
      root: {
        selected: {
          backgroundColor: '#fff'
        }
      }
    }
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Navbar />
          <Routes />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
