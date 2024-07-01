import AreaChartView from "../chart/area-chart";

const Viewchart = ({ chartData, hero, categories }: any) => {
  return (
    <div className="mt-8">
      <AreaChartView
        categories={categories}
        hero={hero}
        percentageChange={chartData?.values[`${hero}_percentageChange`]}
        totalValue={chartData?.values[`${hero}_total_count`]}
        chart={chartData?.values[hero]}
      />
    </div>
  );
};

export default Viewchart;
