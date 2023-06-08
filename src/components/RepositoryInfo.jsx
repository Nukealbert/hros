import React from 'react';
import {  Container, Row,Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function RepositoryInfo() {
    const repo=useSelector(state=>state.repo)
    console.log(repo)
    
   
  return (
    <Container style={{marginTop:'5rem'}} >
      <Row>
      <Card className="bg-dark text-white" >
      
        <Card.Title>{repo.full_name}</Card.Title>
        <Card.Text>{repo.description}</Card.Text>
        <Card.Text>{repo.visibility}</Card.Text>
        <Card.Text>
         {repo.topics}
        </Card.Text>
        
        <Card.Text>Last updated 3 mins ago</Card.Text>
      
    </Card>
      </Row>
    </Container>
  )
}

export default RepositoryInfo