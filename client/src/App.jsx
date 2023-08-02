import { useSelector } from 'react-redux'
import './App.css'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { themeSettings } from 'theme'

function App() {

  const mode=useSelector(state=>state.global.mode)
  const theme=useMemo(() => {
    createTheme(themeSettings(mode), [mode])
  }
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      </ThemeProvider>
    </>
  )
}

export default App
