import React, {useRef, useEffect, useState} from 'react';
import {select} from 'd3';

const Study_1 = () => {

    const [data, setData] = useState([25,30,45,60,20]);

    const svgRef = useRef();


    useEffect(()=>{
        const svg = select(svgRef.current);
        svg
            .selectAll("circle")  // circle tag를 찾아 아래 데이터를 추가 한다.
            .data(data)
            .join("circle") // circle tag를 생성 한다.
            .attr("r", value => value) // 특성 값을 제공 한다.
            .attr("cx", value => value*2)
            .attr("cy", value => value *2)
            .attr("stroke","red");
    },[data]);


    // useEffect(()=>{
    //    const svg = select(svgRef.current);
    //    svg
    //        .selectAll("circle")
    //        .data(data)
    //        .join(
    //            enter => enter.append("circle").attr("class","new"),
    //            update => update.attr("class","updated"),
    //            exit => exit.remove()
    //         )
    //         .attr("r", value => value)
    //         .attr("cx", value => value*2)
    //         .attr("cy", value => value *2)
    //         .attr("stroke","red");
    // },[data]);

    return (
        <>
            <svg ref={svgRef}/>
            <br/>
            <button onClick={()=> setData(data.map(value => value +5))}> Update Data</button>
            <button onClick={()=> setData(data.filter(value => value<35))}> filter Data</button>
        </>
    );
};

export default Study_1;