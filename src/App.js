import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const App = () =>{
  const [submitData,setSubmitData] = useState([])
  const [user, setUser] = useState({
    fname:'',
    lname:'',
    state:'',
    division:'',
    district:'',
    taluka:'',
    village:'',
    education:'College',
    gender:'Female'
  });

  let [stateList, setStateList] = useState([]);
  let [divisionList, setDivisionList] = useState([]);
  let [districtList, setDistrictList] = useState([]);
  let [talukaList, setTalukaList] = useState([]);
  let [villageList, setVillageList] = useState([]);
  const handleChangeState = (e) => {
    const temp = e.target.value.split('$')
    getDivisionListByStateId(temp[0]);
    handleTextFieldChange(e)
  };
  const handleChangeDivision = (e) => {
    const temp = e.target.value.split('$')
    getDistrictListByDivisionId(temp[0])
    handleTextFieldChange(e)
  }
  const handleChangeDistrict = (e) => {
    const temp = e.target.value.split('$')
    getTalukaListByDistrictId(temp[0])
    handleTextFieldChange(e)
  }
  const handleChangeTaluka = (e) => {
    const temp = e.target.value.split('$')
    getVillageListByTalukaId(temp[0])
    handleTextFieldChange(e)
  }
  const handleChangeVillage = (e) => {
    handleTextFieldChange(e)
  }

  useEffect(() => {
    localStorage.clear();
    getStateList();
}, []);

const getStateList = () =>{
  const requestOptions ={
    method: 'GET',
    headers: { },
  }
  fetch('http://awsmaster.mahamining.com/master/states/GetState',requestOptions)
      .then(response => response.json())
      .then(data => {
        setStateList(data.responseData);
      }

      );
};

const getDivisionListByStateId = (stateId) =>{
  const requestOptions ={
    method: 'GET',
    headers: { },
  }
  fetch(`http://awsmaster.mahamining.com/master/divisions/${stateId}`,requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.responseData !== null){
          setDivisionList(data.responseData);
        }else{
          setDivisionList([])
        }        
      }

      );
}

const getDistrictListByDivisionId = (divisionId) =>{
  const requestOptions ={
    method: 'GET',
    headers: { },
  }
  fetch(`http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId/${divisionId}`,requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.responseData !== null){
          setDistrictList(data.responseData);
        }else{
          setDistrictList([])
        }        
      }

      );
}

const getTalukaListByDistrictId = (districtId) =>{
  const requestOptions ={
    method: 'GET',
    headers: { },
  }
  fetch(`http://awsmaster.mahamining.com/master/talukas/GetTalukaByDistrictId/${districtId}`,requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.responseData !== null){
          setTalukaList(data.responseData);
        }else{
          setTalukaList([])
        }        
      }

      );
}

const getVillageListByTalukaId = (talukaId) =>{
  const requestOptions ={
    method: 'GET',
    headers: { },
  }
  fetch(`http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/${talukaId}`,requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.responseData !== null){
          setVillageList(data.responseData);
        }else{
          setVillageList([])
        }        
      }

      );
}

const handleTextFieldChange = (e) =>{
  setUser( {...user,[e.target.name]: e.target.value} )
}



const submitForm = () => {
  console.log(user)
  let temp_state = [...submitData];
  if(localStorage.getItem('updateId')){
    temp_state[Number(localStorage.getItem('updateId'))]=user;
  }else{
    temp_state.push(user);
  }
  localStorage.removeItem('updateId');
  setSubmitData(temp_state);
  
  localStorage.removeItem('userData');
  localStorage.setItem('userData',JSON.stringify(temp_state))
  resetForm();
}
const resetForm = () => {
  const temp={
    fname:'',
    lname:'',
    state:'',
    division:'',
    district:'',
    taluka:'',
    village:'',
    education:'College',
    gender:'Female',
    stateLabel:''
  };
  setUser(temp);
}
const deleteForm= (e,index)=>{
  let temp_data = JSON.parse(localStorage.getItem('userData'));
  temp_data.splice(index,1);
  setSubmitData(temp_data);
  localStorage.removeItem('userData');
  localStorage.setItem('userData',JSON.stringify(temp_data))
}

const updateForm= (e,index)=>{
  let user=submitData[index];
  localStorage.setItem('updateId',index)
  setUser(user);
}
  return (
    <div>
      <Box style={{backgroundColor:'#07078e', color:'white'}}><div><h1>My Application</h1></div></Box>
    <Paper style={{padding:10}}>
    <h1>Personal Information</h1>
    <hr />
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={6}>
    <TextField id="standard-fname" label="First Name" name="fname" onChange={handleTextFieldChange} value={user.fname} variant="standard" />
    </Grid>
    <Grid item xs={6}>
    <TextField id="standard-lname" label="Last Name" name="lname" onChange={handleTextFieldChange} value={user.lname} variant="standard" />
    </Grid>

    <Grid item xs={6}>
    <FormControl component="fieldset">
  <RadioGroup
    aria-label="gender"
    value={user.gender}
    name="gender"
    onChange={handleTextFieldChange}
  >
    <FormControlLabel  control={<Radio />} value="Female" label="Female" />
      <FormControlLabel control={<Radio />} value="Male" label="Male" />
  </RadioGroup>
</FormControl>
    </Grid>
    <Grid item xs={6}>
    <FormControl component="fieldset">
  <RadioGroup
    aria-label="education"
    value={user.education}
    name="education"
    onChange={handleTextFieldChange}
  >
    <FormControlLabel  control={<Radio />}  value="High School" label="High School" />
      <FormControlLabel control={<Radio />} value="College" label="College" />
      <FormControlLabel  control={<Radio />} value="University" label="University" />
  </RadioGroup>
</FormControl>
    </Grid>
    <Grid item xs={3}>
    <FormControl variant="standard" style={{width:'100%'}}>
    <InputLabel id="demo-simple-select-standard-label">Select State</InputLabel>
        <Select
          id="demo-simple-select-standard"
          value={user.state}
          onChange={handleChangeState}
          label="state"
          name="state"
          labelId={user.stateLabel}
        >
          {stateList.map(state => <MenuItem key={state.id} data-state-name={state.state} value={state.id+'$'+state.state} >{state.state}</MenuItem>)} 
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3}>
    <FormControl variant="standard" style={{width:'100%'}}>
    <InputLabel id="demo-simple-select-standard-label-division">Select Division</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label-division"
          id="demo-simple-select-standard-division"
          value={user.division}
          onChange={handleChangeDivision}
          label="division"
          name="division"
        >
          {divisionList.map(division => <MenuItem key={division.id} value={division.id+"$"+division.division} >{division.division}</MenuItem>)} 
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3}>
    <FormControl variant="standard" style={{width:'100%'}}>
    <InputLabel id="demo-simple-select-standard-label-district">Select District</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label-district"
          id="demo-simple-select-standard-district"
          value={user.district}
          onChange={handleChangeDistrict}
          label="district"
          name="district"
        >
          {districtList.map(district => <MenuItem key={district.id} value={district.id+"$"+district.district} >{district.district}</MenuItem>)} 
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3}>
    <FormControl variant="standard" style={{width:'100%'}}>
    <InputLabel id="demo-simple-select-standard-label-taluka">Select Taluka</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label-taluka"
          id="demo-simple-select-standard-taluka"
          value={user.taluka}
          onChange={handleChangeTaluka}
          label="taluka"
          name="taluka"
        >
          {talukaList.map(taluka => <MenuItem key={taluka.id} value={taluka.id+'$'+taluka.taluka} >{taluka.taluka}</MenuItem>)} 
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={3}>
    <FormControl variant="standard" style={{width:'100%'}}>
    <InputLabel id="demo-simple-select-standard-label-village">Select Village</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label-village"
          id="demo-simple-select-standard-taluka"
          value={user.village}
          onChange={handleChangeVillage}
          label="village"
          name="village"
        >
          {villageList.map(village => <MenuItem key={village.id} value={village.id+'$'+village.name} >{village.name}</MenuItem>)} 
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={9}></Grid>
    <Grid item xs={1}>
    <Button variant="contained" onClick={submitForm}>Submit</Button> 
    </Grid>
    <Grid item xs={1}>
    <Button variant="contained" onClick={resetForm}>Reset</Button> 
    </Grid>
    </Grid>
    </Paper>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Division</TableCell>
            <TableCell align="right">District</TableCell>
            <TableCell align="right">Taluka</TableCell>
            <TableCell align="right">Village</TableCell>
            <TableCell align="right">Education</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submitData.map((row,index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{row.fname+' '+row.lname}</TableCell>
              <TableCell align="right">{row.state.split('$')[1]}</TableCell>
              <TableCell align="right">{row.division.split('$')[1]}</TableCell>
              <TableCell align="right">{row.district.split('$')[1]}</TableCell>
              <TableCell align="right">{row.taluka.split('$')[1]}</TableCell>
              <TableCell align="right">{row.village.split('$')[1]}</TableCell>
              <TableCell align="right">{row.education}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">
               <Button variant="contained" style={{margin:5}} onClick={(e)=>updateForm(e,index)}>Update</Button> 
              <Button variant="contained" style={{backgroundColor:'red'}} onClick={(e)=>deleteForm(e,index)}>Delete</Button> 
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
};

export default App;
