import React, {useEffect, useRef, useState} from 'react';
import {axisBottom, axisRight, scaleBand, scaleLinear, select} from 'd3';
import ResizeObserver from "resize-observer-polyfill";  // resize전용 npm install resize-observer-polyfill

//axisBottom
//axisRight   범래 위치

const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setDimensions(entry.contentRect);
            });
        });
        resizeObserver.observe(observeTarget);
        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref]);
    return dimensions;
};

function Study_6({data}) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        console.log(dimensions);

        if (!dimensions) return;

        const xScale = scaleBand() // 선에서, 차트로 변경함
            .domain(data.map((value, index) => index)) // 데이터 표현 구간
            .range([0, dimensions.width]) //표현할 size change
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0, 150]) // todo
            .range([dimensions.height, 0]); // change

        const colorScale = scaleLinear()
            .domain([75, 100, 150])  // 색상 값 표현을 위한 기본 값 range의 index 개수와 동일 한 개수로 작성 되어야함
            .range(["green", "orange", "red"]) //색상 표현 값
            .clamp(true); // 임의 값이 아닌 초기에 평균값으로 통일화 해줌

        const xAxis = axisBottom(xScale).ticks(data.length)
        svg
            .select(".x-axis")  // 클래스 선턱
            .style("transform", `translateY(${dimensions.height}px)`)
            .call(xAxis); //x축 값 그리기

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", `translateX(${dimensions.width}px)`) // y축 값 그리기
            .call(yAxis);

        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1)") //차트 방향 설정, 차트 영역을 벗어나 반전 되어 그려짐
            .attr("x", (value, index) => xScale(index))
            .attr("y", -dimensions.height) // 차트 뱡향 설정에서 y값을 원래대로 되 돌림, 주석 처리 될 경우 위 transform 옵션이 반영됨
            .attr("width", xScale.bandwidth())
            .on("mouseenter", (event, value) => {   //d3 v6에서 event 값과 value의 값의 순서가 변경됨

                // const index = svg.selectAll(".bar").nodes().indexOf(this);
                const index = svg.selectAll(".bar").nodes().indexOf(event.target);

                svg
                    .selectAll(".tooltip") //  마우스 이벤트 발생시 표현할 클래스 찾기
                    .data([value])  // 데이터 표현
                    .join((enter) => enter.append("text")
                        .attr("y", yScale(value) - 4))   //tag 설정 tag의 값이 위에서 생성되어 내려 옴으로, 아래측에서 발생 되도록 조건을 설정함
                    .attr("class", "tooltip") //클래스 선언
                    .text(value)    //표현 할 값 지정
                    .attr("x", xScale(index) + xScale.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .transition() // 이 효과 밑에 있는것이 적용 됨, 즉 이거 위에 있는것은 다 적용 되지 않음
                    .attr("y", yScale(value) - 8) // 해당 값을 해당 차트 위에 표현 -8을 주어 살짝 띄어줌
                    .attr("opacity", 1);
            })
            .on("mouseleave", () => svg.select(".tooltip").remove()) // 마우스를 때면 값을 지움
            .transition()  // 점프 효과, 그런데 높이 아래에 추가할 경우 적용되지 않음
            .attr("fill", colorScale) // 컬러 스케일 설정
            .attr("height", (value) => dimensions.height - yScale(value)); // 높이 설정
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
            <svg ref={svgRef}>
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>
        </div>
    );
}

export default Study_6;