import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useQuery } from "@apollo/client";
import List from "@mui/material/List";
import { GET_PEOPLE } from "../../queries";

import PersonList from "../list/PersonList";
function PersonCard() {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return "Error has occured in the application.";
  return (
    <Card sx={{ maxWidth: "80%" }} style={{ height: "80%" }}>
      <CardContent>
        <List component="nav">
          <PersonList data={data} />
        </List>
      </CardContent>
    </Card>
  );
}

export default PersonCard;
