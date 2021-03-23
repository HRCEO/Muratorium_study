import React, {useEffect, useRef, useState} from "react";
import {geoMercator, geoPath, max, min, scaleLinear, select} from "d3";
import useResizeObserver from "./studyfile/useResizeObserver";

function Study_8({data, property}) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [p, setp]= useState(null)

    useEffect(() => {


        console.log(p);




        const svg = select(svgRef.current);
        // console.log("1 : ",svgRef); // tag 이름
        // console.log("2 : ",svgRef.current);  // tag 전체 선택
        // console.log("3 : ",svgRef.current.getBoundingClientRect()); //태그 위치 정보

        const minProp = min(data.features, feature => feature.properties[property])
        const maxProp = max(data.features, feature => feature.properties[property])
        const colorScale = scaleLinear()
            .domain([minProp, maxProp])
            .range(["#ccc", "red"]);

        const {width, height} =
        dimensions || wrapperRef.current.getBoundingClientRect();
        // console.log("data : ", data)
        // console.log("data.features : ", data.features)
        // console.log("feature : ", feature => feature)
        // console.log("feature.properties[property] : ", feature => feature.properties[property])
        // console.log("minProp : ", minProp)
        // console.log("maxProp : ", maxProp)
        // console.log("colorScale : ", colorScale)
        // console.log("dimensions : ", dimensions)
        // console.log("width  height : ", width, height)

        const projection = geoMercator().fitSize(
            // [width, height], selectedCountry || data
            [width, height], selectedCountry || data
        ).precision(100);

        const pathGenerator = geoPath().projection(projection);

        console.log("selectedCountry : ",selectedCountry);
        console.log("projection : ", projection)


        // this.testRef.current.addEventListener(CLICK, ()=> (this.props.data))
        //
        // onClick={this.handleChartClick}
        //
        // handleChartClick = (data) =>{
        //     console.log('data length on click', data);
        // }

        svg
            .selectAll(".country")
            .data(data.features)
            .join("path")
            .on("click", (e,feature) => {
                setSelectedCountry(selectedCountry === feature ? null : feature);
                // const copiedObj = Object.assign(feature);
                // console.log(copiedObj);
                // setSelectedCountry(123123);
                // console.log("setCountry :",selectedCountry);
            })
            .attr("class", "country")
            .transition()
            .duration(1000)
            .attr("fill", feature => colorScale(feature.properties[property]))
            .attr("d", feature => pathGenerator(feature));

        // svg
        //     .selectAll(".label")
        //     .data([selectedCountry])
        //     .join("text")
        //     .attr("class","label")
        //     .text(
        //         feature =>
        //             feature &&
        //             feature.properties.name +
        //             ": " +
        //             feature.properties[property].toLocaleString()
        //     )
        //     .attr("x",10)
        //     .attr("y",25);

    }, [data, dimensions, property]);

    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}/>
        </div>
    )
}

export default Study_8;