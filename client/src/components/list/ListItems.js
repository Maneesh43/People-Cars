import ListItem from "@mui/material/ListItem";
import { IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useState,useEffect} from "react";
import { Edit, Delete, ExpandMoreRounded } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import CarCard from "../cards/CarCard";
import { GET_PERSON_CARS,UPDATE_PERSON,UPDATE_CAR} from "../../queries";
import { useQuery,useMutation } from "@apollo/client";
import { InputLabel, Input, InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import format_currency from "../formatter";

const ListItems = ({ item, last, id ,dat,type}) => {
  const [expanded, setExpanded] = useState(false);
  const [editable, seteditable] = useState(false);
  const [values,setValues] = useState({});
  const [, forceUpdate] = useState()
  const [updateCar] = useMutation(UPDATE_CAR)
const [updatePerson] = useMutation(UPDATE_PERSON)
  const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { id },
    skip: !expanded,
  });
  useEffect(() => {
    forceUpdate()
  }, [])


const handleupdateCar = (make,model,personId,year,price) => {
  const id=dat.id
  updateCar({
    variables: {
      id,
      make,
      model,
      personId,
      year,
      price
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateCar: {
        __typename: 'Car',
        id,
        make,
        model,
        personId,
        year,
        price
      }
    }
  })
}

const handleupdatePerson = (firstName,lastName) => {
const id=dat.id
updatePerson({
  variables: {
    id,
    firstName,
    lastName
  },
  optimisticResponse: {
    __typename: 'Mutation',
    updatePerson: {
      __typename: 'Person',
      id,
     firstName,
     lastName
    }
  }
})
}

const handleUpdate=(t)=>{
  console.log(dat)
let {model,make,personId,year,price}=dat
switch(type){
case "model":{
  model=values.model
handleupdateCar(make,model,personId,parseInt(year),parseFloat(price)*1.0)
}
break
case "make":{
  make=values.make
  const d=0
handleupdateCar(make,model,personId,parseInt(year),parseFloat(price)*1.0)
}
break;
case "personId":{
  personId=values.personId
  const d=0
handleupdateCar(make,model,personId,parseInt(year),parseFloat(price)*1.0)
}
break
case "year":{
  year=values.year
handleupdateCar(make,model,personId,parseInt(year),parseFloat(price)*1.0)
}
break
case "price":{
  price=values.price
handleupdateCar(make,model,personId,parseInt(year),parseFloat(price)*1.0)
}
break
case "firstName":{
handleupdatePerson(values.firstName,dat.lastName)
}
break
case "lastName":{
handleupdatePerson(dat.firstName,values.lastName)
}
break
}
}

  const dataa = {};
  if (data !== undefined || null & !loading) {
    dataa["car"] = data.personCars;
  }
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const handleExpandClick = (d) => {
    setExpanded(!expanded);
  };

  const handleChange=(e)=>{  
    const name = type;
    const value = e.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  }

  return (
    <>
      <ListItem key={item}>
        {/* Toggle edit text */}
        {!editable ? (
          <ListItemText primary={(type==="price")?format_currency(item):item} />
        ) : (
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard" key={item}>
            <InputLabel htmlFor="standard-adornment-password">
              {item}
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={"text"}
              placeholder={item}
              name={item}
              onChange={(e) => {handleChange(e)}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                  name={item}
                    aria-label="toggle password visibility"
                    
                  >
                    <SaveAltIcon data-type={item}
                    name={item} onClick={(e) => {
                      const target=e.target.parentNode.name
                      handleUpdate(target)
                      seteditable(false);
                      setExpanded(false);
                    }}/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        )}
        {/* Toggle edit text */}
        <IconButton key={item}>
          <Edit
            onClick={() => {
              seteditable((e) => !e);
            }}
          />
        </IconButton>

        
      </ListItem>
      {last && (
        <>
          <ExpandMore
            expand={expanded}
            onClick={() => handleExpandClick()}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreRounded />
          </ExpandMore>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {/* Add car cards here */}
              {data !== undefined || null & !loading & dataa ? (
                <CarCard cars={dataa} />
              ) : (
                ""
              )}
            </CardContent>
          </Collapse>
        </>
      )}
    </>
  );
};

export default ListItems;
