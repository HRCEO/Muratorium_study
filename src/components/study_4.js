import React, {useRef, useEffect, useState} from 'react';
import {select,axisBottom, scaleLinear,axisRight,scaleBand} from 'd3';
//axisBottom
//axisRight   범래 위치

const Study_4 = () => {

    const [data, setData] = useState([25,30,45,60,20,65,75]);
    const svgRef = useRef();

    useEffect(()=>{
        const svg = select(svgRef.current);
        const xScale = scaleBand() // 선에서, 차트로 변경함
            .domain(data.map((value,index)=>index)) // 데이터 표현 구간
            .range([0,300]) //표현할 size
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0,150])
            .range([150,0]);

        const colorScale = scaleLinear()
            .domain([75,100,150])  // 색상 값 표현을 위한 기본 값 range의 index 개수와 동일 한 개수로 작성 되어야함
            .range(["green","orange","red"]) //색상 표현 값
            .clamp(true); // 임의 값이 아닌 초기에 평균값으로 통일화 해줌


        const xAxis = axisBottom(xScale).ticks(data.length)
        svg
            .select(".x-axis")  // 클래스 선턱
            .style("transform", "translateY(150px)")
            .call(xAxis); //x축 값 그리기

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(300px)") // y축 값 그리기
            .call(yAxis);

        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class","bar")
            .style("transform","scale(1, -1)") //차트 방향 설정, 차트 영역을 벗어나 반전 되어 그려짐
            .attr("x",(value,index)=>xScale(index))
            .attr("width",xScale.bandwidth()) //
            .attr("y",-150) // 차트 뱡향 설정에서 y값을 원래대로 되 돌림, 주석 처리 될 경우 위 transform 옵션이 반영됨
            .transition()  // 점프 효과, 그런데 높이 아래에 추가할 경우 적용되지 않음
            .attr("fill", colorScale) // 컬러 스케일 설정
            .attr("height",value=>150-yScale(value)); // 높이 설정
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

export default Study_4;