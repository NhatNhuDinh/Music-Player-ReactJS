import { useState } from 'react'
import songs from "./assets/js/songs.js"

import Header from './components/Header/Header'
import CD from './components/CD/CD';
import Control from './components/Control/Control.jsx';
import ProgressBar from './components/ProgressBar/ProgressBar.jsx';
import Song from './components/Song/Song.jsx';


function App() {
  const [isPlaying, setPlaying] = useState(false);
  const [isRandom, setRandom] = useState(false);
  const [isRepeat, setRepeat] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  let currentSong = songs[currentIndex]


  const handleTogglePlay = () => {
    setPlaying(!isPlaying);
  }

  const handleSongSelect = (index) => {
    setCurrentIndex(index)
    setPlaying(true)
  }

  const handleNextSong = () => {
    if (isRandom) {
      randomIndex();
      setPlaying(true);
    } else {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= songs.length) nextIndex = 0;
      handleSongSelect(nextIndex);
    }

  }

  const handlePrevSong = () => {
    if (isRandom) {
      randomIndex();
      setPlaying(true);
    } else {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = songs.length - 1;
      handleSongSelect(prevIndex);
    }
  }

  const handleRepeatSong = () => {
    setRepeat(!isRepeat);
  }

  const handRandomSong = () => {
    setRandom(!isRandom);
  }

  const randomIndex = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * songs.length)
    } while (newIndex === currentIndex)
    setCurrentIndex(newIndex);
  }

  return (
    <div className={`player ${isPlaying ? 'playing' : ''}`}>

      <div className='dashboard'>
        <Header title={currentSong.name} />
        <CD
          imgUrl={currentSong.image}
          isPlaying={isPlaying} />
        <Control
          onTogglePlay={handleTogglePlay}
          isRandom={isRandom}
          isRepeat={isRepeat}
          handleRepeat={handleRepeatSong}
          handleRandom={handRandomSong}
          nextSong={handleNextSong}
          prevSong={handlePrevSong} />
        <ProgressBar
          src={currentSong.path}
          isPlaying={isPlaying}
          isRepeat={isRepeat}
          nextSong={handleNextSong} />

      </div>
      <div className='playlist'>
        {
          songs.map((song, index) => (
            <Song
              key={index}
              title={song.name}
              imgUrl={song.image}
              singer={song.singer}
              onSelectSong={() => handleSongSelect(index)}
              isActive={currentIndex === index}
            />
          ))
        }
      </div>
    </div>

  )
}

export default App;
