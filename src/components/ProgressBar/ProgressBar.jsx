import { useRef, useEffect } from "react";

export default function ProgressBar({ src, isPlaying, isRepeat, nextSong }) {
    const audioRef = useRef(null);
    const progressRef = useRef(null);


    // Theo dõi thay đổi của isPlaying
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [src, isPlaying]); // ← chạy mỗi khi isPlaying, src đổi



    // xử lí sự kiện với progress tua hoặc end song
    useEffect(() => {
        const audio = audioRef.current;
        const progress = progressRef.current;

        // xử lí khi tua bài hát
        progress.oninput = function (e) {
            const percent = e.target.value;
            const seekTime = audio.duration * percent / 100
            audio.currentTime = seekTime;
        }

        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const currentProgressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = currentProgressPercent;
            }
        }

        // xử lí khi audio ended
        audio.onended = function () {
            if (isRepeat) {
                audio.play();
            } else {
                nextSong();
            }

        }

        // remove listener khi unmount
        return () => {
            progress.oninput = null;
            audio.ontimeupdate = null;
            audio.onended = null;
        };

    }, [nextSong, isRepeat]); // khi setCurrentIndex thay đổi và render lại app, tạo hàm nextSong mới ở bên App sau đó truyền vào đây

    return (
        <>
            <input ref={progressRef}
                id="progress"
                className="progress"
                type="range"
                defaultValue="0"
                step="1"
                min="0"
                max="100"
            />
            <audio ref={audioRef} src={src}></audio>
        </>
    );
}
