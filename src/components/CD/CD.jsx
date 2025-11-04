import { useEffect, useRef } from "react";

function CD({ imgUrl, isPlaying }) {
    const cdRef = useRef(null);
    const cdThumbRef = useRef(null);
    const animationRef = useRef(null);

    // Tạo animation 1 lần duy nhất khi component mount
    useEffect(() => {
        const cdThumb = cdThumbRef.current;
        animationRef.current = cdThumb.animate(
            [
                { transform: "rotate(0deg)" },
                { transform: "rotate(360deg)" }
            ],
            {
                duration: 10000,
                iterations: Infinity
            }
        );
        animationRef.current.pause(); // dừng mặc định
    }, []);

    useEffect(() => {
        if (animationRef == null) return;
        isPlaying ? animationRef.current.play() : animationRef.current.pause()

    }, [isPlaying])


    // Xử lý thu nhỏ CD khi cuộn
    useEffect(() => {
        const cdThumb = cdRef.current;
        const initialWidth = cdThumb.offsetWidth;

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = Math.max(initialWidth - scrollTop, 0);
            cdThumb.style.width = newWidth + "px";
            cdThumb.style.opacity = newWidth / initialWidth;
        };

        window.addEventListener("scroll", handleScroll);

        // cleanup khi component bị unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <>
        <div ref={cdRef} className="cd">
            <div
                ref={cdThumbRef}
                className="cd-thumb"
                style={{ backgroundImage: `url(${imgUrl})` }}>
            </div>
        </div>
    </>
}

export default CD;