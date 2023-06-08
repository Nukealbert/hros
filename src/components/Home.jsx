import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Container, Stack,Row,Col,Form, FormLabel, Card, } from 'react-bootstrap';
import {BsPower} from 'react-icons/bs';
import '../styles/style.css';
import {BsFillBrightnessLowFill} from 'react-icons/bs';
import {AiOutlineFork} from 'react-icons/ai'

const Home = () => {
    const dispatch=useDispatch()
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [language, setLanguage] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [date, setDate] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`;

        const response = await axios.get(url);
        setTrendingRepos(response.data.items);
        console.log(response.data.items)
      } catch (error) {
        console.error('Error fetching trending repos:', error);
      }
    };

    fetchTrendingRepos();
  }, [date]);

  const handleRepoClick = (repo) => {
    dispatch({type:"repoDetail", payload:repo})
    navigate('/repodetail')
   
  };

  const handleDateRangeChange = (e) => {
    const selectedRange = e.target.value;
    setDateRange(selectedRange)
    let isoDate;

    if (selectedRange === 'daily') {
      isoDate = new Date().toISOString().split('T')[0];
    } else if (selectedRange === 'weekly') {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      isoDate = startDate.toISOString().split('T')[0];
    } else if (selectedRange === 'monthly') {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      isoDate = startDate.toISOString().split('T')[0];
    }

    setDate(isoDate);
    
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogout = () => {
    
    navigate('/');
  };

  const filteredRepos = trendingRepos.filter((repo) => {
    if (language) {
      return repo.language === language;
    }
    return true;
  });

  return (
    
         <Stack gap={2} className="col-md-5 mx-auto" style={{minWidth:'100%'}}>
            <Container>
                <Row style={{paddingTop:'0.5rem'}}>
                    <Col xs={10}>
                    <h2>Trending Repositories</h2>
                    </Col>
                    <Col >
                    <Button variant="secondary"   onClick={handleLogout}><BsPower /> Logout</Button >

                    </Col>
                </Row>
                <Row style={{padding:'5rem'}}>
                    <Col>
                        <FormLabel>Select Date Range:</FormLabel>
                        <Form.Select value={dateRange} onChange={handleDateRangeChange}>
                                <option value="daily">Today</option>
                                <option value="weekly">This week</option>
                                <option value="monthly">This month</option>
                        </Form.Select>
                    </Col>
                    <Col>
                    <FormLabel>Select Language:</FormLabel>
                        <Form.Select value={language} onChange={handleLanguageChange}>
                            <option value="">All</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
            <Container>
            <Row  className='justify-content-md-center p-5 repo' style={{cursor:'pointer',color:'white' }}>
                {
                    filteredRepos.map((repo) =>(
                        
                        <Card key={repo.id}  className='col-sm-12 bg-dark  mb-2'style={{height:'100%', backgroundColor:'#1B1212',color:'white'}}>
                            <Card.Title className='repohead'  onClick={() => handleRepoClick(repo)}>{repo.full_name}</Card.Title>
                            <Card.Text>{repo.description}</Card.Text>
                            <Card.Text ><AiOutlineFork/>{repo.forks_count} <BsFillBrightnessLowFill />{repo.language}</Card.Text>
                           
                           
                           
                        </Card>
                    ))
                }
                </Row>
            </Container>
         </Stack>

      
     
      
  
  );
};

export default Home;
