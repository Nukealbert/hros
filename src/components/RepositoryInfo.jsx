import React from 'react';
import { useSelector } from 'react-redux';

function RepositoryInfo() {
    const repo=useSelector(state=>state.repo)
    
   
  return (
    <div>{repo.id}</div>
  )
}

export default RepositoryInfo