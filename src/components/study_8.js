import React, {useEffect, useRef, useState} from "react";
import {geoMercator, geoPath, max, min, scaleLinear, select} from "d3";
import useResizeObserver from "./studyfile/useResizeObserver";

function Study_8({data, property}) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
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

        const projection = geoMercator().fitSize(
            [width, height], selectedCountry || data
        ).precision(100);

        const pathGenerator = geoPath().projection(projection);

        svg
            .selectAll(".country")
            .data(data.features)
            .join("path")
            .on("click", (e,feature) => {
                setSelectedCountry(selectedCountry === feature ? null : feature);
            })
            .attr("class", "country")
            .transition()
            .attr("fill", feature => colorScale(feature.properties[property]))
            .attr("d", feature => pathGenerator(feature));

        svg
            .selectAll(".label")
            .data([selectedCountry])
            .join("text")
            .attr("class","label")
            .text(
                feature =>
                    feature &&
                    feature.properties.name +
                    ": " +
                    feature.properties[property].toLocaleString()
            )
            .attr("x",10)
            .attr("y",25);

    }, [data, dimensions, property,selectedCountry]);

    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}/>
        </div>
    )
}

export default Study_8;