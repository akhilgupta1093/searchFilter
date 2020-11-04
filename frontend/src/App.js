import './App.css';
import data from './data/db.json'
import React, { useState, useEffect } from 'react'
import humanizeString from 'humanize-string'

function App() {
  const [id, setId] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [fruit, setFruit] = useState('')
  const [items, setItems] = useState(data)

  const columns = Object.keys(data[0])

  // after we update any of the search terms, we update the items variable as well
  // filter the data by all the current search terms
  // note: if a search term === '', the index will be 0
  useEffect(() => {
    setItems(data.filter( (post) => {
      if (String(post['_id']).toLowerCase().indexOf(String(id).toLowerCase()) === -1) {
        return false
      } else if (String(post['gender']).toLowerCase().indexOf(String(gender).toLowerCase()) === -1) {
        return false
      } else if (String(post['phone']).toLowerCase().indexOf(String(phone).toLowerCase()) === -1) {
        return false
      } else if (String(post['favoriteFruit']).toLowerCase().indexOf(String(fruit).toLowerCase()) === -1) {
        return false
      } else {
        return true
      }
    }))
  }, [id, gender, phone, fruit])

  // set the search term variable
  const handleSearch = (e) => {
    switch (e.target.name) {
      case '_id':
        setId(e.target.value)
        break
      case 'gender':
        setGender(e.target.value)
        break
      case 'phone':
        setPhone(e.target.value)
        break
      case 'favoriteFruit':
        setFruit(e.target.value)
        break
    }
  }

  return (
    <div className="App">
      <table className="table">
        <tbody>
          <tr>
            {
              columns.map( column => {
                return (
                  <td>
                    <input className="form-input"
                     key={column}
                     type="text"
                     name={column}
                     onChange={handleSearch}
                     placeholder={humanizeString(column)}/>
                  </td>
                )
              })
            }
          </tr>
          <tr>
            {
              columns.map( column => {
                return (<th key={column}>{humanizeString(column)}</th>)
              })
            }
          </tr>
          {
            items.map( item => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.gender}</td>
                  <td>{item.phone}</td>
                  <td>{item.favoriteFruit}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
