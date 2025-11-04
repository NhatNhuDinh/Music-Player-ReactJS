export default function Song({imgUrl, title, singer, onSelectSong, isActive}) {
    return <>
        <div className={`song ${isActive ? 'active' : ''}`} onClick={onSelectSong}>
            <div className="thumb"
                style={{ backgroundImage: `url(${imgUrl})`}}>
            </div>
            <div className="body">
                <h3 className="title">{title}</h3>
                <p className="author">{singer}</p>
            </div>
        </div>
    </>
}