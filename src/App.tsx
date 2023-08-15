import { User } from './User';
import usersData from './DATA/users.json'
import './App.css'
import { useState } from 'react';



const App: React.FC = () => {
  const users = usersData.map((userData: any) => {
    return new User(
      userData.userId,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.location,
      userData.isActive,
      userData.zcmRole,
      userData.admRole,
      userData.lastUpdated,
      userData.updateUser,
      userData.comsId
    );
  });

const initialSearchCriteria = {
  userId: '',
  firstName: '',
  lastName: '',
  comsId: '',
  isActiveYes: false,
  isActiveNo: false,
  hasAdminRole: false,
};

  const [matchUsers, setMatchUsers] = useState<User[]>([]);
  const [showFiltered,setShowFiltered] = useState(Boolean);
  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
  const [selectedRole, setSelectedRole] = useState("Select role");
  const roles: string[] = ["opt1","opt2","opt3"];

 
  

  const handleSearch = () => {
    if(fieldsFull()){
      const filteredUsers = findMatching(searchCriteria, users);
      setMatchUsers(filteredUsers);
      setShowFiltered(true);
    }else{
      alert("Please fill at least one field");
    }

  }

  const handleReset = () =>{
    setSearchCriteria(initialSearchCriteria);
    setShowFiltered(false);
    setMatchUsers([])
   
  }

  const getActiveString = () => {


    if(searchCriteria.isActiveYes){
       return  "Yes"
    }else if (searchCriteria.isActiveNo){
      return  "No"
    }else{
     return  ""
    }
    return "";
  }


  const fieldsFull = () => {
    if(searchCriteria.userId !== ""|| searchCriteria.firstName !== "" || searchCriteria.lastName !== "" || searchCriteria.comsId !== "" || getActiveString() !== ""){
      return true;
    }else{
      return false;
    }
  }

  const generateParamText = () => {

    const paramParts: string [] = [];

    if(searchCriteria.userId !== ""){
        paramParts.push("ID: "+searchCriteria.userId);
    }

    if(searchCriteria.firstName !== ""){
      paramParts.push("First name: "+searchCriteria.firstName);
    }

    if(searchCriteria.lastName !== ""){
      paramParts.push("Last name: "+searchCriteria.lastName);
    }

    if(searchCriteria.comsId !== ""){
      paramParts.push("COMSI: "+searchCriteria.comsId);
    }

    if(getActiveString() !== ""){
      paramParts.push("Active: "+getActiveString());
    }

    return paramParts.join(',');
  }

  function alreadyIn(user: User): boolean {
    for (const user1 of matchUsers) {
        if (user1.userId === user.userId) {
            return true; 
        }
    }
    return false; 
}
 
  const findMatching = (criteria: any, userList: User[]) => {
        userList.forEach(user => {
      if (
        (criteria.userId !== '' && criteria.userId !== user.userId) ||
        (criteria.firstName.toLowerCase() !== '' && criteria.firstName.toLowerCase() !== user.firstName.toLowerCase()) ||
        (criteria.lastName.toLowerCase() !== '' && criteria.lastName.toLowerCase() !== user.lastName.toLowerCase()) ||
        (criteria.comsId.toLowerCase() !== '' && criteria.comsId.toLowerCase() !== user.comsId.toLowerCase()) ||
        ((criteria.isActiveYes = user.isActive) || 
        (criteria.isActiveNo = user.isActive)) ||
        (criteria.hasAdminRole && !user.admRole)
      ) {
        // No match
      } else {
        if(alreadyIn(user)){
        }else{
          matchUsers.push(user);
        }
      }
    }); 
    return matchUsers;
  };

  const setHeading = () => {
    return showFiltered ? 'Found Users' : 'User List';
  };
  const setDropdownLabel = () => {
    if(selectedRole != ""){
      return selectedRole;
    }else{
      return "Select role";
    }
  }

  return (
    <>
    <div className='id-group'>
      <label className='field-desc'>ID:</label>
      <input
        className='input-field'
        type="text"
        onChange={e => setSearchCriteria({ ...searchCriteria, userId: e.target.value })}
        value={searchCriteria.userId}
      />
    </div>
    <div>
      <label className='field-desc'>First name:</label>
      <input
        className='input-field'
        type="text"
        onChange={e => setSearchCriteria({ ...searchCriteria, firstName: e.target.value })}
        value = {searchCriteria.firstName}
      />
    </div>
    <div>
      <label className='field-desc'>Last name:</label>
      <input
        
        className='input-field'
        type="text"
        onChange={e => setSearchCriteria({ ...searchCriteria, lastName: e.target.value })}
        value = {searchCriteria.lastName}
      />
    </div>
    <div>
      <label className='field-desc'>COMSI:</label>
      <input
        className='input-field'
        type="text"
        onChange={e => setSearchCriteria({ ...searchCriteria, comsId: e.target.value })}
        value = {searchCriteria.comsId}
      />
    </div>

    <div className='dropdown'>
      <select value={selectedRole} className="role-button">
        <option>{selectedRole}</option>
        {roles.map((option,index) =>(
          <option key={index} value={option}>
          {option}
        </option>
        ))}
      </select>
      </div>

    <div>
        <label className='checkboxText'>
          <input
            className='checkbox'
            type='checkbox'
            checked={searchCriteria.isActiveYes}
            onChange={e =>
              setSearchCriteria({
                ...searchCriteria,
                isActiveYes: e.target.checked,
                isActiveNo: false, // Uncheck the opposite checkbox
              })
            }
          />{' '}
          Active (Yes)
        </label>
        <label className='checkboxText'>
          <input
           className='checkbox'
            type='checkbox'
            checked={searchCriteria.isActiveNo}
            onChange={e =>
              setSearchCriteria({
                ...searchCriteria,
                isActiveNo: e.target.checked,
                isActiveYes: false, 
              })
            }
          />{' '}
          Active (No)
        </label>
      </div>
    <button onClick={handleSearch} className="button left-button">Search</button>
    <button onClick={handleReset} className="button right-button">Reset</button>
    <div className='divider'></div>
    <div className='lists'>
    <div className="user-list">
      <h1 className='list-heading'>{setHeading()}</h1>
      <ul>
          {showFiltered
            ? matchUsers.map(user => (
                <li className='list-item' key={user.userId}>
                  {user.toString()}
                </li>
              ))
            : users.map(user => (
                <li className='list-item' key={user.userId}>
                  {user.toString() }
                </li>
                
              ))}
        </ul>     
    </div>
  
    </div>
  </>
  );
};

export default App;
