import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {countSwitcher, limitSwitcher} from "../../helpers"

interface SelectProps {
  limit: string
  setLimit: React.Dispatch<React.SetStateAction<number>>
  setPageQyt: React.Dispatch<React.SetStateAction<number>>
}

export const DefaultSelect: React.FC<SelectProps> = ({limit, setLimit, setPageQyt}) => {
  const handleChange = (event: SelectChangeEvent): void => {
    setLimit(parseInt(event.target.value))
    localStorage.setItem('lmt', JSON.stringify(event.target.value))

    setPageQyt(countSwitcher(parseInt(event.target.value)))
    localStorage.setItem('qyt', JSON.stringify(countSwitcher(parseInt(event.target.value))))
  }

  return (
    <Box sx={{width: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Limit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          label="Limit"
          onChange={handleChange}
        >
          <MenuItem selected={limitSwitcher(limit)} value={10}>10</MenuItem>
          <MenuItem selected={limitSwitcher(limit)} value={20}>20</MenuItem>
          <MenuItem selected={limitSwitcher(limit)} value={50}>50</MenuItem>
          <MenuItem selected={limitSwitcher(limit)} value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}