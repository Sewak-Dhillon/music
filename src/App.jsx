import { useCallback, useRef, useState } from 'react';
import './App.css';
import { Sidebar, Music, MusicPlayer } from './components';
import { MusicProvider } from './content/MusicContext';
import { genrateRandomId } from './utils/generateRandomId';

function App() {
  const ref = useRef(null);
  const [favourite, setFavourite] = useState([5,10,9]);
  const [id, setId] = useState(null);
  const inner = useRef(null)

  const playNext = (arg) => {
    if(arg === 1){
      const newId = genrateRandomId(id);
      setId(newId);
    }else
      setId((prev) => prev + 1);
  };

  const handleFavourite = () => {
    if (!favourite.includes(id)) {
      setFavourite((prev) => {
        const newArr = [...prev];
        newArr.push(id);
        return newArr;
      });
    } else {
      setFavourite((prev) => {
        const newArr = [...prev];
        const arr = newArr.filter((item) => item !== id);
        return arr;
      });
    }
  };

  const handleLeft = (setLeft,left) => {
    if(left < 0)
      setLeft(prev => prev+136)
  }

  const handleRight = (setLeft,left,data) => {
    if(left > -(data.length * 136 - inner.current.offsetWidth))
      setLeft(prev => prev-136)
  }

  const onMusicChange = (newId) => {
    if (id === newId) {
      if (ref.current) ref.current.currentTime = 0;
    } else setId(newId);
  };

  return (
    <MusicProvider
      value={{
        id,
        ref,
        inner,
        favourite,
        handleLeft,
        handleRight,
        handleFavourite,
        playNext,
        onMusicChange,
      }}
    >
      <div className="bg-black w-full min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex flex-1 flex-col lg:flex-row pt-3 pl-3">
          <div className="lg:w-1/4 w-full">
            <Sidebar />
          </div>
          <div className="flex-1 w-full">
            <Music />
          </div>
        </div>

        {/* Music Player */}
        <div className="fixed bottom-0 w-full bg-gray-900 text-white">
          <MusicPlayer />
        </div>
      </div>
    </MusicProvider>
  );
}

export default App;
