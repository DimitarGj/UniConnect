import React from 'react'

import "./css/HeaderNavBar.css";
import { useNavigate } from 'react-router-dom';

export const SearchResultsList = ({results}) => {
    const navigate = useNavigate();
    const goToProfile = (id) => {
        navigate('/profile/' + id);
    }

    const goToOrgProfile = (id) => {
        navigate('/org-profile/' + id);

    }
  return (
    <div className='results-List'>
        {
            results.map((result, id) =>{
                if(result.firstName){
                    return (
                        <div className="searchItem">
                            <a onClick={()=>navigate('/VisitProfile', {state:{userProfile:result}})}>{result.firstName} {result.lastName}</a>
                        </div>
                    );
                }
                else{
                    return <div className="searchItem" onClick={() => goToOrgProfile(id)}>{result.org_name}</div>
                }
                
            })
        }
    </div>
  )
}
