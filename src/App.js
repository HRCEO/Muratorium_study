import React, {useState} from "react";
import data from "./components/studyfile/GeoChart.world.geo.json"
import "./App.css"
import useInterval from "./components/studyfile/useInterval"; //7번 전용
import Study_1 from "./components/study_1"; // 기본 원 및 데이터 수정
import Study_2 from "./components/study_2"; // 선 그리기
import Study_3 from "./components/study_3"; // x,y축 그리기
import Study_4 from "./components/study_4"; // 바 차트, 색상
import Study_5 from "./components/study_5"; // 차트 추가 및 형식 변경
import Study_6 from "./components/study_6"; // 반응형 size 조절 및 componet data 전달 방식 변경
import Study_7 from "./components/study_7";
import Study_8 from "./components/study_8";

// study_6번 전용
// function App() {
//
//     const [data, setData] = useState([25,30,45,60,20,65,75]);
//
//     return (
//         <>
//             <Study_6 data={data}/>
//             <br/><br/>
//             <button onClick={()=> setData(data.map(value => value +5))}> Update Data</button>
//             <button onClick={()=> setData(data.filter(value => value<35))}> filter Data</button>
//             <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>Add data</button>
//
//         </>
//     );
// }
// export default App;

//study_07번 전용
//
// const getRandomIndex = array => {
//     return Math.floor(array.length * Math.random());
// };
//
// function App() {
//
//     const videoRef = useRef();
//     const [iteration, setIteration] = useState(0);
//     const [start, setStart] = useState(false);
//     const [data, setData] = useState([
//         {
//             name: "alpha",
//             value: 10,
//             color: "#f4efd3"
//         },
//         {
//             name: "beta",
//             value: 15,
//             color: "#cccccc"
//         },
//         {
//             name: "charlie",
//             value: 20,
//             color: "#c2b0c9"
//         },
//         {
//             name: "delta",
//             value: 25,
//             color: "#9656a1"
//         },
//         {
//             name: "echo",
//             value: 30,
//             color: "#fa697c"
//         },
//         {
//             name: "foxtrot",
//             value: 35,
//             color: "#fcc169"
//         }
//     ]);
//
//     useInterval(() => {
//         if (start) {
//             const randomIndex = getRandomIndex(data);
//             setData(
//                 data.map((entry, index) =>
//                     index === randomIndex
//                         ? {
//                             ...entry,
//                             value: entry.value + 10
//                         }
//                         : entry
//                 )
//             );
//             setIteration(iteration + 1);
//         }
//     }, 500);
//
//     useEffect(() => {
//         navigator.mediaDevices
//             .getUserMedia({video: true, audio: false})
//             .then(stream => {
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.play();
//             });
//     }, []);
//
//     return (
//         <>
//             <h1>Racing Bar Chart</h1>
//             <Study_7 data={data}/>
//             <button onClick={() => setStart(!start)}>{start ? "Stop the race" : "Start the race!"}</button>
//             <p>Ineration : {iteration}</p>
//             <video
//                 ref={videoRef}
//                 style={{transfrom: "scale(-1, 1)"}}
//                 width="300"
//                 height="150">
//             </video>
//         </>
//     );
// }
//
//export default App;

// study_08번 전용
function App() {
    const [property, setProperty] = useState("pop_est");

    return (
        <>
            <h2>World Map with d3-geo</h2>
            <Study_8 data={data} property={property}/>
            <h2>Select property to highlight</h2>
            <select
                value={property}
                onChange={event => setProperty(event.target.value)}>

                <option value="pop_est">Population</option>
                <option value="name_len">Name length</option>
                <option value="gdp_md_est">GDP</option>
            </select>
            {/*<video/>*/}
        </>
    );
}

export default App;

// function App() {
//   return (
//       <>
//         <Study_7/>
//      </>
//   );
// }
//
// export default App;
