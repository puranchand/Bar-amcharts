import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function HorizontalBarChart(props) {

    const { color = '#80d8ff', className = '', width = '100%', height = "500px", title = 'AmChart' } = props;
    useLayoutEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.data = props.data;
        // chart.legend = new am4charts.Legend();
        chart.cursor = new am4charts.XYCursor();

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        // categoryAxis.title.text = "Countries";
        categoryAxis.renderer.labels.template.fontSize = 0;
        categoryAxis.renderer.labels.template.fill = am4core.color("#808080");

        categoryAxis.renderer.line.strokeOpacity = 1;
        categoryAxis.renderer.line.strokeWidth = 1;
        categoryAxis.renderer.line.stroke = am4core.color("#3787ac");
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.labelsEnabled = false;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        // valueAxis.title.text = "Litres sold (M)";
        valueAxis.renderer.grid.template.strokeWidth = 0;

        let series = chart.series.push(new am4charts.ColumnSeries());

        series.dataFields.valueX = "litres";
        series.dataFields.categoryY = "country";
        series.stroke = am4core.color("#CDA2AB");

        let valueLabel = series.columns.template.createChild(am4core.Label);
        valueLabel.text = "{country}";
        valueLabel.fontSize = 10;
        valueLabel.valign = "middle";
        valueLabel.dx = 8;
        valueLabel.strokeWidth = 0;

        let bullet = series.bullets.push(new am4charts.LabelBullet());
        bullet.label.text = "{litres}";
        bullet.label.horizontalCenter = "left";
        bullet.locationX = 1;
        bullet.dx = -40;
        bullet.label.rotation = 0;
        bullet.label.truncate = false;
        bullet.label.hideOversized = false;

        // let scrollbarX = new am4charts.XYChartScrollbar();
        // scrollbarX.series.push(series);
        // chart.scrollbarX = scrollbarX;
        // series.columns.template.tooltipText =
        //   "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
        series.columns.template.fill = am4core.color(color);

        return () => {
            chart.dispose();
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className={"grid grid-cols-2 " + className}>
            <div className="text-center"><h2>{title}</h2></div>
            <div id={props.id} style={{ width: width, height: height }}></div>
        </div>
    );
}