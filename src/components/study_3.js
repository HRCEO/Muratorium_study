import React, {useRef, useEffect, useState} from 'react';
import {select, line, curveCardinal, axisBottom, scaleLinear,axisRight} from 'd3';
//axisBottom
//axisRight   범래 위치

const Study_3 = () => {

    const [data, setData] = useState([25,30,45,60,20,65,75]);
    const svgRef = useRef();

    useEffect(()=>{
        const svg = select(svgRef.current);

        const xScale = scaleLinear()
            .domain([0,data.length-1]) // 데이터 표현 구간
            .range([0,300]); // 표현할 size

        const yScale = scaleLinear()
            .domain([0,150])
            .range([150,0]);

        const xAxis = axisBottom(xScale)
            .ticks(data.length) // xScale의 domain값을 가지고 옴
            .tickFormat(index => index + 1);   // 기존 x값 범래가 1단위로 변경됨

        svg
            .select(".x-axis")  // 클래스 선턱
            .style("transform", "translateY(150px")
            .call(xAxis); //x축 값 그리기

        const yAxis = axisRight(yScale);

        svg
            .select(".y-axis")
            .style("transform", "translateX(300px") // y축 값 그리기
            .call(yAxis);

        const myLine = line()
            .x((value, index)=> xScale(index))
            .y(yScale)
            .curve(curveCardinal);

        svg.selectAll(".line")  // path라는 tag 가 존재 하기 때문에, 기존 path tag에 아래 데이터 들이 들어가게 됨으로
                                // 데이터가 아래쪽에 나오는데, 이를 방지 하기 위하여 기존에 없는 tag를 적어 주고 line tag를 생성 한다.
            .data([data])
            .join("path")  // path tag 생성
            .attr("class", "line") // line 클래스 추가
            .attr("d", myLine)
            .attr("fill","none")
            .attr("stroke","blue");
    },[data]);

    return (
        <>
            <svg ref={svgRef}>
                    <g className="x-axis"/>
                    <g className="y-axis"/>
            </svg>
            <br/><br/>
            <button onClick={()=> setData(data.map(value => value +5))}> Update Data</button>
            <button onClick={()=> setData(data.filter(value => value<35))}> filter Data</button>
        </>
    );
};

export default Study_3;