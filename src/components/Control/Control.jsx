

export default function Control({onTogglePlay, isRandom, isRepeat, handleRepeat, handleRandom, nextSong, prevSong}) {

    return <>
            <div className="control">
                <div className={`btn btn-repeat ${isRepeat ? 'active' : ''}`} onClick={handleRepeat}>
                    <i className="fas fa-redo"></i>
                </div>
                <div className="btn btn-prev" onClick={prevSong}>
                    <i className="fas fa-step-backward"></i>
                </div>
                <div className="btn btn-toggle-play" onClick={onTogglePlay}>
                    <i className="fas fa-pause icon-pause"></i>
                    <i className="fas fa-play icon-play"></i>
                </div>
                <div className="btn btn-next" onClick={nextSong}>
                    <i className="fas fa-step-forward"></i>
                </div>
                <div className={`btn btn-random ${isRandom ? 'active' : ''}`} onClick={handleRandom}>
                    <i className="fas fa-random"></i>
                </div>
            </div>         
    </>
}