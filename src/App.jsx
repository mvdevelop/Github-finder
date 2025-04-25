
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { Button, TextInput, Avatar } from 'evergreen-ui';

import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const searchProfile = async () => {
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${username}`);
      const data = await res.json();
      console.log(data);

      if (data.items.length > 0) {
        setProfile(data.items[0]);
        setError(null);
      } else {
        setProfile(null);
        setError('Error');
      }

    } catch (e) {
      console.error(e);
      setError('Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente.');
    }
  };

  return (
    <>
      <div className='container'>
        <div className='title'>
          <FaGithub className='icon'/>
          <h2>Perfil <span>GitHub</span></h2>
        </div>
        <div className='search'>
          <TextInput className='input' onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Digite um usuário do Github'/>
          <Button marginRight={16} appearance='primary' onClick={searchProfile}>
            <BsSearch />
          </Button>
        </div>
        {error && (
          <p className='error'>{error}</p>
        )}
        {profile && (
          <div className='user'>
            <Avatar className='user-img' src={profile.avatar_url} name={profile.login} size={120} />
            <div className='user-data'>
              <h3>{profile.login}</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla blanditiis quae deleniti dolores consequatur delectus molestias iste in perferendis error, nemo explicabo! Officiis totam harum hic nam asperiores quis animi!</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App;
