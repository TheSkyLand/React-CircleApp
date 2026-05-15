import React, { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import CircleButton from "../components/CircleButton";
import { YearsData } from '../helpers/YearsData';
import { SwiperData } from "../helpers/SwiperData";

import "../styles/index.scss";

import "swiper/css";
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


gsap.registerPlugin(useGSAP);


const MainPage = () => {
    const [firstYear, setFirstYear] = useState("1980");
    const [secondYear, setSecondYear] = useState("1986");
    const [counter, setCounter] = useState(1);

    // Ссылка на большой круговой контейнер
    const circleRef = useRef<HTMLDivElement>(null);

    const plswork = SwiperData.filter(item => item.id == counter);


    useGSAP(() => {
        if (!circleRef.current) return;


        const targetRotation = -(counter - 1) * 60;


        gsap.to(circleRef.current, {
            rotation: targetRotation,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
        });


        gsap.to(".main-square-circle-buttons-single, .main-square-circle-buttons-active", {
            rotation: -targetRotation,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
        });


        gsap.to(".main-square-circle-buttons-single .main-square-circle-buttons-single-label", {
            opacity: 0,
            visibility: "hidden",
            duration: 0.3,
            ease: "power2.out"
        });


        gsap.to(".main-square-circle-buttons-active .main-square-circle-buttons-single-label", {
            opacity: 1,
            visibility: "visible",
            duration: 0.5,
            delay: 0.4, // Небольшая задержка, чтобы текст проявлялся в конце поворота круга
            ease: "power2.out"
        });

    }, { dependencies: [counter], scope: circleRef });
    const activate = (fv: number) => {
        let nextCounter = fv;
        if (fv > 6) {
            nextCounter = 1;
        } else if (fv < 1) {
            nextCounter = 6;
        }

        setCounter(nextCounter);

        const currentYearData = YearsData.find(index => nextCounter === index.id);
        if (currentYearData) {
            setFirstYear(currentYearData.firstYear);
            setSecondYear(currentYearData.secondYear);
        }
    };



    return (
        <div className="main">
            <div className="main-square">
                <div className="main-square-years">
                    <span className="main-square-years-first">{firstYear}</span>
                    <span className="main-square-years-second">{secondYear}</span>
                </div>
                <div className="main-square-text">
                    <div className="main-square-text-divider" />
                    <div className="main-square-text-label">
                        <span className="main-square-text-label-upper">Исторические</span>
                        <span className="main-square-text-label-lower">даты</span>
                    </div>
                </div>
                <div className="main-square-line-horizontal" />
                <div className="main-square-line-vertical" />
                <div className="main-square-circle" ref={circleRef}>
                    <div className="main-square-circle-buttons">
                        {YearsData.map((item, key) => (
                            <CircleButton
                                key={item.id || key}
                                firstYear={() => setFirstYear(item.firstYear)}
                                secondYear={() => setSecondYear(item.secondYear)}
                                backCounter={() => setCounter(key + 1)}
                                num={key + 1}
                                backnum={counter}
                                label={item.label}
                            />
                        ))}
                    </div>
                </div>
                <div className='main-square-swiper'>
                    <div className="main-square-swiper-switch">
                        <div className="main-square-swiper-switch-pagination">0{counter}/06</div>
                        <button
                            className="main-square-swiper-switch-button"
                            onClick={() => activate(counter - 1)}
                        ><img src={"../images/Vector2.svg"} /></button>
                        <button
                            className="main-square-swiper-switch-button"
                            onClick={() => activate(counter + 1)}
                        ><img src={"../images/Vector1.svg"} /></button>
                    </div>

                    <Swiper
                        navigation={true}
                        slidesPerView={3}
                        modules={[Navigation]}
                        className="main-square-swiper-dates">
                        {plswork.flatMap(index =>
                            index.data.map((item, key) => (
                                <SwiperSlide key={key}>
                                    <div className="main-square-swiper-dates-events-year">
                                        {item.date}
                                    </div>
                                    <div className="main-square-swiper-dates-events-info">
                                        {item.info}
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>

                </div>
            </div>
        </div >

    )
}


export default MainPage

