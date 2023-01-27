import React from 'react'

const FiltersContext = React.createContext({
  employmentTypeList: [],
  addEmploymentType: () => {},
})

export default FiltersContext
